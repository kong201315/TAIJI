# 智承太极 — Figma 接入与首页绘制过程报告

> 编写日期：2026-08-12 ｜ 项目：智承太极（全国建模精英联赛参赛项目）
> 主线：**怎么接入 Figma → 怎么用 Figma 画首页 → 第一页效果**
> 项目目录：`C:\Users\KONG\.openclaw\agents\main\全国建模精英联赛\`
> Figma 文件：fileKey `kJbQQa5AIqT41fiNON90QQ` ｜ 首页 frame `4:2`（1440×1040）

---

## 一、为什么用 Figma（背景）

项目采用**双线交付**：Figma 可点击高保真原型（参赛展示/文档）+ 可运行 Web 应用（真实交互、答辩演示）。

要把 `index.html` 复刻成 **Figma 可编辑设计稿**，作为参赛展示用。复刻范围覆盖全部 21 张参考图页面（Dashboard、课程列表、招式详情、3D 查看、评分结果、训练记录、推手对战等，1440px 宽，含深色模式）。

---

## 二、怎么接入 Figma 的（接入过程）

接入发生在 **2026-08-05**，先后试了三条路，最终确立可写入工具链。

### 1. figma-developer-mcp —— 先接入（只读）

- **需求**：在 Figma 里新建画布、画页面
- **环境检查**：`claude mcp list` 确认当时无任何 MCP；node v24 / npm 11 齐全；Figma 桌面版运行中
- **方案决策**：选社区方案 `figma-developer-mcp`（npx 即装即用，支持创建 frame/rectangle/text 节点）
- **接入命令**：
  ```
  claude mcp add figma-developer-mcp --env FIGMA_API_KEY=<token> -- npx -y figma-developer-mcp --stdio
  ```
- **令牌**：主人在 Figma 生成个人访问令牌（API key）
- **落地**：写入本地 `~/.claude.json`（项目级）→ `claude mcp list` 显示 **Connected ✓**
- **安全**：token 真值仅存本地 MCP 配置，**不进入任何记忆/共享文件**

### 2. html.to.design MCP —— 被墙，弃用保留

- 排查 `mcp.to.design`：解析到 Google IP `173.194.43.121`，**大陆直连 60s 超时不可用**
- 官网可访问；MCP 配置保留，**需代理才能启用**（有代理后可自动化批量导入）

### 3. figma-designer-mcp + AI Figma Designer 插件 —— 主用（可写入）

- **为什么换**：figma-developer-mcp 偏**只读**，而复刻 21 页设计稿需要**写入**能力
- **接入**：注册 `figma-designer-mcp`（stdio，`FIGMA_TOKEN` 复用同一 token）→ **Connected ✓**（44+ 写入工具，AI→设计）
- **配套插件桥接**：写入需配套插件，经 **WebSocket 桥到本地 3055 端口**，在当前打开的 Figma 文件内执行
  - 把包内预构建的 `figma-plugin/`（**AI Figma Designer** 插件）复制到 `C:\Users\KONG\figma-designer-plugin\`
  - manifest.json 已核验（id: `openclaw-figma-bridge`，网络全放行）
  - **修了插件字体验证 bug**：原代码先写 `characters` 再设 `fontName`，未加载字体时报错；已改为 `fontName` 在前
- **主人一次性操作**：Figma 桌面版 Plugins → Development → Import plugin from manifest → 选 `C:\Users\KONG\figma-designer-plugin\manifest.json`；运行插件 → 输入 `ws://127.0.0.1:3055` → Connect（插件窗口不能退出）
- **工具生效**：MCP 工具在会话启动时加载，**重启 Claude Code 会话后生效**

### 接入链最终形态

```
Claude Code (figma-designer-mcp, stdio)
        │  FIGMA_TOKEN
        ▼
AI Figma Designer 插件 (本地 3055 端口, WebSocket)
        │
        ▼
当前打开的 Figma 文件（直接写入 frame / text / fill ...）
```

---

## 三、怎么用 Figma 画首页的（绘制过程）

### 1. 从 HTML 提取画稿规格

先分析 `index.html` 首页 `#page-home` 结构与设计系统，整理成可直接绘制的规格：

- **总 frame**：1440×1040「智承太极-首页」，布局 = 侧边栏 232px + 主内容（padding 36/48/60）
- **设计系统**：深色科技武术风 — 背景 `#F5F2ED`、强调红 `#B8312F`、金 `#C4A35A`、成功绿 `#3D8B37`、警示橙 `#D4850A`、导航深底 `#0F1419`
- 各区块规格（Welcome Banner 深色渐变、3 Stat 卡环形 100×100、Quick 双卡、本周目标金环、教师反馈金 box）全部先量化再画

### 2. 首页清空重画（2026-08-05 上午）

首页**整体清空重画**，采用"**训练进行中**"演示状态：已掌握 **3/16**、得分 **19**、境界 **入门**、本周 **3/5**。

绘制内容：
- **侧边栏**：完整分组导航（4 组 11 项，带图标），首页总览高亮 active
- **Welcome Banner**：深色渐变 + stat 点
- **3 张 Stat 卡**：白底卡片 + **环形部分弧**（部分圆弧展示进度）
- **Quick 快捷区**、**本周目标卡**、**教师反馈**金色 info-box

### 3. 绘制中踩过的坑（工具级经验）

| 坑 | 现象 | 解法 |
|----|------|------|
| 容器用错 | RECTANGLE 不能当父节点，子节点挂不上、结构错乱、reparent 报错 | **容器一律用 FRAME**，圆角用 `set_corner_radius` |
| `add_text` 假错误 | 报 `appendChild is not a function`，但文本其实已创建成功 | 用 find_nodes 确认实际创建，别被错误吓到 |
| 环形偏移 | 环形部分弧旋转 -90° 后**偏移 100px 错位** | 旋转后必须 **`set_position` 复位** |
| 桥接断开 | `set_fill` 报 `Figma plugin not connected` | 以 `figma_bridge_status` 的 connected 为准，断连让主人在 Figma 重连 3055 |
| 插件字体顺序 | 先写 characters 再设 fontName 报未加载字体 | `fontName` 放 `characters` 之前（已修） |

### 4. 未完成项（工具限制）

- **卡片阴影**：figma-add-effect 工具 bug 
- **太极水印**：工具限制，建议主人用素材
- Claude Code auto mode 分类器会**随机误判拦截 Figma 绘图操作**，遇到需重试或放行

---

## 四、第一页效果（首页成品）

| 区域 | 效果 |
|------|------|
| **整体** | 1440×1040 深色科技武术风；左侧深色导航 + 右侧浅米色内容区 |
| **侧边栏** | Logo「智承太极 / 数字教学系统」+ 4 组 11 项分组导航带图标（首页总览 active 高亮）+ 底部用户「金润山 + 班级 + ⚙」 |
| **Welcome Banner** | 深色渐变（`#0F1419→#1C2530→#233040`）圆角 14；"早上好" 小字 + "欢迎回来，金润山" 衬线大字 + 3 个红/金/绿 stat 点 |
| **3 张 Stat 卡** | 白底卡片，**环形部分弧**进度（100×100，描边底 `#EDE9E3` + 色环 78 红 / 12 绿 / 3 橙），数字 26px + label + 绿色 delta（+5 等） |
| **Quick 快捷区** | 两卡：继续学习（浅红渐变图标）/ 开始训练（浅金渐变图标，52px） |
| **本周目标** | 金色环 64px 3/5 + 5 行训练记录（绿/金/灰点） |
| **教师反馈** | 金色 info-box（`#F5EDDA`，左边框 3px `#C4A35A`，标题 12px `#8B6914`） |

当前首页 frame：**`4:2`，1440×1040**，fileKey `kJbQQa5AIqT41fiNON90QQ`。

---

## 五、当前状态与下一步

| 项目 | 状态 |
|------|------|
| Figma 接入工具链 | figma-designer-mcp + 插件桥已跑通（可写入） |
| 首页 | 清空重画完成，环形/渐变已完善 |
| 桥接 | 当前会话 Figma bridge 未连接（connected: false，需主人插件重连） |
| 待铺开 | 确认首页后复刻**数字教案库**（课程列表→招式详情→3D 查看→分步教学）→ AI 训练系统 → 其余页面 |

**下一步动作**：
- [ ] **** 确认首页效果（环形对齐、布局）；卡片阴影手动加；如需绘制先重连插件 `ws://127.0.0.1:3055`
- [ ] **[claude code]** 确认后铺开数字教案库页面
- [ ] **[可选]** 有代理时启用 html.to.design 批量导入

---

*附：本次报告数据来源——共享记忆会话 `2026-08-05`、`2026-08-05_2`、`2026-08-05_3`、工具经验记忆、项目档案。*
