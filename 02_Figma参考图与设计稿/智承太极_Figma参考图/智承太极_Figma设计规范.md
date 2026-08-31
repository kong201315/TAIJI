# 智承太极 — Figma 设计规范

> 提取自 index.html CSS，Ink-Tech Fusion 设计体系

---

## 一、全局基础

| 属性 | 值 |
|------|-----|
| 基准字号 | 14px |
| 行高 | 1.6 |
| 画布宽度 | 1440px |
| 侧边栏宽度 | 232px |
| 主内容区 padding | 36px 48px 60px |

---

## 二、颜色变量

### 背景色
| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--bg` | `#F5F2ED` | 主背景（纸色暖白） |
| `--bg-warm` | `#EDE9E3` | 次级暖色背景 |
| `--card` | `#FFFFFF` | 卡片/表面白色 |

### 前景色
| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--text` | `#1A1A1A` | 主文字 |
| `--text-secondary` | `#3A3632` | 次级文字 |
| `--text-muted` | `#7A756D` | 辅助/说明文字 |

### 强调色
| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--accent` | `#B8312F` | 朱红主强调（CTA、Active、强调线） |
| `--accent-hover` | `#9E2A28` | 朱红悬停态 |
| `--accent-light` | `#FBF0F0` | 朱红浅底 |
| `--gold` | `#C4A35A` | 金色点缀（高亮、分隔线） |
| `--gold-light` | `#F5EDDA` | 金色浅底 |

### 功能色
| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--success` | `#3D8B37` | 成功/完成 |
| `--success-light` | `#EBF5EA` | 成功浅底 |
| `--warning` | `#D4850A` | 警告/学习提示 |
| `--warning-light` | `#FEF6E6` | 警告浅底 |
| `--danger` | `#C62828` | 危险/错误 |
| `--tag-bg` | `#EDE9E3` | 标签背景 |

### 侧边栏专用色
| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--nav-bg` | `#0F1419` | 侧边栏深色底色 |
| `--nav-bg-subtle` | `#161D25` | 侧边栏渐变底 |
| `--nav-text` | `#C8C2B8` | 导航文字 |
| `--nav-text-dim` | `#6B6560` | 导航灰文字 |

### 边框/分割
| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--border` | `#D5D0C8` | 边框/分割线/滚动条 |
| `--border-light` | `#E8E4DE` | 浅色边框（卡片用） |

---

## 三、字体体系

### 字体家族
| 用途 | 字体栈 |
|------|--------|
| UI 字体 | system-ui, -apple-system, Segoe UI, Microsoft YaHei, sans-serif |
| 衬线标题 | Noto Serif SC, SimSun, serif |
| 等宽字体 | SF Mono, Consolas, Courier New, monospace |

### 文字样式（按用途，非 Figma Text Style 编号）

| 样式 | 字体 | 字号 | 字重 | 用途 |
|------|------|------|------|------|
| **Logo 文字** | Microsoft YaHei | 20px | 700 | 侧边栏 "智承太极" |
| **Logo 副标** | Microsoft YaHei | 10px | — | 侧边栏拼音，字间距 3px |
| **Page Title** | Noto Serif SC | 24px | 700 | 页面主标题，字间距 0.5px |
| **Card Title** | Microsoft YaHei | 15px | 600 | 卡片标题 |
| **Card Meta** | Microsoft YaHei | 12px | — | 卡片元信息 |
| **Body** | Microsoft YaHei | 14px | — | 正文（html 基准），行高 1.6 |
| **Page Desc** | Microsoft YaHei | 13px | — | 页面描述文字 |
| **Nav Item** | Microsoft YaHei | 13px | — | 导航项 |
| **Nav Group Title** | Microsoft YaHei | 10px | 600 | 导航分组标题，大写，字间距 2px |
| **Sidebar User** | Microsoft YaHei | 13px | 500 | 用户名称 |
| **Sidebar Role** | Microsoft YaHei | 11px | — | 用户角色 |
| **Breadcrumb** | Microsoft YaHei | 12px | — | 面包屑 |
| **Caption** | Microsoft YaHei | 12px | — | 说明文字 |

---

## 四、圆角

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | 6px | 小元素（设置按钮、标签） |
| `--radius-md` | 10px | 卡片、容器 |
| `--radius-lg` | 14px | 大容器 |

---

## 五、阴影

| Token | 值 | 用途 |
|-------|-----|------|
| `--shadow-sm` | `0 1px 3px rgba(26,26,26,0.06)` | 轻微浮起 |
| `--shadow-md` | `0 4px 16px rgba(26,26,26,0.08)` | 卡片悬停 |
| `--shadow-lg` | `0 8px 32px rgba(26,26,26,0.10)` | 大弹层 |
| `--shadow-card` | `0 2px 8px rgba(180,170,155,0.12)` | 卡片默认（暖色投影） |

---

## 六、核心组件速查

### 侧边栏导航
- 宽度：232px，全高
- 背景：`#0F1419` → `#161D25` 渐变
- 右侧内阴影分割线
- Logo 区域：padding 28px 24px 24px，底部半透明白色分割
- 导航项：padding 9px 24px，左侧 3px 透明→朱红 Active 指示线
- Hover：背景 `rgba(255,255,255,0.04)`，文字变白
- Active：背景 `rgba(184,49,47,0.08)` + 左侧朱红线
- 底部用户区：34px 圆形头像（朱红渐变），用户信息 + 设置按钮

### 卡片
- 背景白色，1px `#E8E4DE` 边框，10px 圆角
- 阴影 `0 2px 8px rgba(180,170,155,0.12)`
- Hover：上移 2px + 阴影加深
- Clickable active：归位 `translateY(0)`

### 面包屑
- 字号 12px，颜色 `#7A756D`
- 链接项 hover 变朱红
- 分隔符颜色 `#D5D0C8`

### 页面标题
- Noto Serif SC 24px Bold
- 字间距 0.5px
- 下方 4px 后跟页面描述（13px, `#7A756D`）

### 自定义滚动条
- 宽度 6px
- 轨道透明
- Thumb：`#D5D0C8`，3px 圆角，hover 变 `#7A756D`

### 页面转场
- `display:none` + `opacity:0` → `display:block` + fadeIn
- 动画：280ms ease-out，从下方 8px 淡入

---

## 七、Figma 文件建议结构

```
智承太极_高保真原型_v1
├── 📄 Cover         — 封面页
├── 📄 Design System — 本规范全部落地
│   ├── Colors (Local Variables)
│   ├── Text Styles (5级)
│   └── Components
│       ├── Button/Primary (Default / Hover / Press / Disabled)
│       ├── Button/Outline
│       ├── Card/Base (Default / Hover)
│       ├── Nav Item (Default / Hover / Active)
│       ├── Tag (已掌握 / 学习中 / 未开始)
│       ├── Breadcrumb
│       ├── Tab (Default / Active)
│       ├── Step Indicator (Done / Current / Future)
│       ├── Toast (Success / Warning / Error)
│       └── Sidebar (完整组件)
├── 📄 Hi-Fi Prototype — 全部页面
│   ├── 首页 Dashboard
│   ├── 课程列表
│   ├── 课程概览
│   ├── 招式详情+3D查看
│   ├── 分步教学
│   ├── AI 实时校准
│   ├── 数字教练
│   ├── 训练记录
│   ├── 教学数据看板
│   ├── 拳法对比
│   └── 数字对战
└── 📄 Flow Diagrams — 信息架构 + 用户旅程
```

---

## 八、配色速查卡（可直接粘贴到 Figma）

```
#F5F2ED  ← 纸色主背景
#EDE9E3  ← 暖色次级背景
#FFFFFF  ← 卡片白
#1A1A1A  ← 主文字
#3A3632  ← 次级文字
#7A756D  ← 辅助文字
#B8312F  ← 朱红强调
#9E2A28  ← 朱红深色
#FBF0F0  ← 朱红浅底
#C4A35A  ← 金色点缀
#F5EDDA  ← 金色浅底
#0F1419  ← 侧边栏深底
#161D25  ← 侧边栏渐变底
#C8C2B8  ← 导航文字
#6B6560  ← 导航灰文字
#D5D0C8  ← 边框/分割
#E8E4DE  ← 卡片边框
#3D8B37  ← 成功绿
#D4850A  ← 警告橙
#C62828  ← 危险红
```
