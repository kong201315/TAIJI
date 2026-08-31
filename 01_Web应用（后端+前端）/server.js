// ============================================================
// 智承太极 — 本地后端服务
// 职责：静态文件 + REST API + 后台定时更新数据（持久化到 data.json）
// 运行：node server.js   →   http://localhost:8080
// 数据：data.json（不存在时自动创建，业务数据真实落在服务器端）
// ============================================================
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DIR = __dirname;
const DATA_FILE = path.join(DIR, 'data.json');
1
const DEFAULT_DATA = {
  user: { name: '金润山', klass: '计算机科学与技术2504班' },
  forms: {},
  dashboard: {
    greeting: '早上好',
    streak: 0,
    weeklyDone: 0, weeklyTarget: 5,
    score: 0, scoreDelta: '+0',
    mastered: 0, masteredTotal: 16, perForm: 6.25, masteredDelta: '+0',
    toCorrect: 0, toCorrectDelta: '—',
    quickResume: '从「起势」开始你的训练',
    quickRecommend: '起势（第一式，从零起步）',
    feedback: '系统已就绪。完成每式训练即可累计分数，16 式满分 100 分。'
  },
  records: []
};

function loadData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch (e) { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}
function saveData() {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2)); }
  catch (e) { console.error('[zhitaiji] 写入数据失败:', e.message); }
}

let db = loadData();
if (!fs.existsSync(DATA_FILE)) saveData();

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// 后台无主动数据变化：分数完全由训练提交 /api/training 驱动（从零累积，未训练即 0 分）

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function send(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', ...CORS });
  res.end(JSON.stringify(body));
}
function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { resolve({}); } });
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.jpg': 'image/jpeg', '.docx': 'application/octet-stream'
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  const method = req.method;

  if (method === 'OPTIONS') { res.writeHead(204, CORS); res.end(); return; }

  // ---- REST API ----
  if (p === '/api/user' && method === 'GET') { send(res, 200, db.user); return; }
  if (p === '/api/user' && method === 'POST') {
    const body = await readBody(req);
    if (body.name) {
      db.user.name = body.name;
      db.user.klass = body.klass || db.user.klass;
      saveData();
    }
    send(res, 200, db.user); return;
  }
  if (p === '/api/dashboard') { send(res, 200, db.dashboard); return; }
  if (p === '/api/records') { send(res, 200, db.records); return; }
  if (p === '/api/forms') { send(res, 200, db.forms || {}); return; }
  if (p === '/api/training' && method === 'POST') {
    // 完成一次训练：每式均分、完成即得分、不重复加分、不扣分；总分 100（A 方案，后期换真实 AI 评分）
    const body = await readBody(req);
    const form = body.form || '起势';
    const seconds = clamp(parseInt(body.seconds) || 30, 5, 900);
    const d = db.dashboard;
    db.forms = db.forms || {};
    const perForm = d.perForm || (100 / (d.masteredTotal || 16));
    const isNew = !db.forms[form];
    if (isNew) {
      db.forms[form] = true;
      d.mastered++;
    }
    d.score = Math.min(100, Math.round(d.mastered * perForm));
    d.streak = (d.streak || 0) + 1;
    if (d.weeklyDone < d.weeklyTarget) d.weeklyDone++;
    const rec = { day: '今日', form: form, score: d.score, isNew: isNew };
    let filled = false;
    for (let i = 0; i < db.records.length; i++) {
      if (db.records[i].score == null) { db.records[i] = rec; filled = true; break; }
    }
    if (!filled) { db.records.push(rec); if (db.records.length > 7) db.records.shift(); }
    saveData();
    const grade = d.score >= 100 ? '圆满' : d.score >= 75 ? '大成' : d.score >= 50 ? '小成' : d.score >= 25 ? '初学' : d.score > 0 ? '入门' : '未开始';
    const next = d.mastered >= d.masteredTotal ? '全部完成' : '学习下一式';
    send(res, 200, { score: isNew ? Math.round(perForm) : 0, total: d.score, grade: grade, next: next, form: form, seconds: seconds, isNew: isNew, forms: db.forms, dashboard: db.dashboard, records: db.records });
    return;
  }

  // ---- 静态文件 ----
  let filePath = p === '/' ? '/index.html' : p;
  const full = path.join(DIR, filePath);
  if (!full.startsWith(DIR)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream', ...CORS });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('[zhitaiji] 服务已启动: http://localhost:' + PORT);
  console.log('[zhitaiji] 数据文件: ' + DATA_FILE);
});
