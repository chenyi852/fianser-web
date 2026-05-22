# fianser 品牌官网技术方案

> **项目**：fianser 品牌官网  
> **域名**：fianser.com（腾讯云注册）  
> **类型**：品牌展示型 + 产品展示 + 引流静态网站  
> **商品**：泳衣、手串、沉香等，约几十 SKU  
> **风格**：高端简约  
> **维护**：开发人员维护 + 运营人员自主更新内容  
> **部署目标**：Cloudflare Pages  
> **交付对象**：CodeArts

---

## 目录

1. [项目概述](#一项目概述)
2. [技术选型](#二技术选型)
3. [网站结构规划](#三网站结构规划)
4. [内容管理方案](#四内容管理方案)
5. [视觉设计规范](#五视觉设计规范)
6. [项目目录结构](#六项目目录结构)
7. [部署实施步骤](#七部署实施步骤)
8. [域名与 DNS 配置](#八域名与-dns-配置)
9. [运营人员操作指南](#九运营人员操作指南)
10. [与 GitHub Pages 对比](#十与-github-pages-对比)
11. [附录：产品数据模板](#十一附录产品数据模板)

---

## 一、项目概述

### 1.1 项目背景

fianser 为电商品牌，主要运营泳衣、手串、沉香等商品。需要在腾讯云已注册的域名 `fianser.com` 上部署品牌官网，实现品牌展示、产品展示及引流功能。

### 1.2 核心需求

| 需求项 | 说明 |
|--------|------|
| 网站类型 | 品牌展示型 + 产品展示 + 引流（无站内支付） |
| 商品规模 | 几十 SKU，三大品类：泳衣、手串、沉香 |
| 视觉风格 | 高端简约，大留白，高质感产品图 |
| 内容更新 | 运营人员可自主更新产品信息，无需开发人员介入 |
| 性能要求 | 全球快速访问，SEO 友好 |
| 维护模式 | 开发人员维护代码框架，运营人员维护内容 |

### 1.3 核心目标

- 建立高端品牌形象，提升品牌认知度
- 清晰展示产品信息，引导用户至购买渠道
- 实现运营人员零代码更新内容
- 全球范围内快速稳定的访问体验

---

## 二、技术选型

### 2.1 技术栈

| 层级 | 技术 | 版本建议 | 选型理由 |
|------|------|----------|----------|
| **框架** | Astro | ^5.x | 静态站性能天花板，SEO 极好，"群岛架构"让页面交互更轻，非常适合内容型品牌站 |
| **样式** | Tailwind CSS | ^4.x | 快速实现高端简约风格，原子化 CSS，定制性强，开发效率高 |
| **语言** | TypeScript | ^5.x | 类型安全，提升代码可维护性 |
| **图标** | Lucide React | ^0.x | 轻量级图标库，风格统一 |
| **内容管理** | Markdown + YAML Front Matter | - | 运营人员通过 GitHub 在线编辑即可更新，保存即自动部署 |
| **部署平台** | Cloudflare Pages | - | 全球 300+ 边缘节点，原生支持 Astro，自动 HTTPS， generous 免费额度 |
| **图片存储** | 腾讯云 COS / Cloudflare Images | - | 产品图量大，建议放对象存储，网站只存链接 |
| **表单处理** | Cloudflare Pages Functions | - | 边缘轻量 API，免费处理联系表单，无需额外服务器 |

### 2.2 为什么不选其他方案

| 方案 | 不选原因 |
|------|----------|
| **WordPress** | 需要服务器和数据库，维护成本高，性能不如静态站 |
| **Shopify** | 月费成本高，功能冗余（不需要站内支付），定制性受限 |
| **Next.js + Vercel** | Next.js 对静态内容生成支持不如 Astro 直接，Vercel 免费 Hobby 计划仅限个人非商业用途 |
| **GitHub Pages** | 原生仅支持 Jekyll，其他框架需自行配置 CI；全球 CDN 节点少；无边缘计算能力 |

---

## 三、网站结构规划

### 3.1 页面结构

```
首页 (/)
├── 全屏品牌视频/大图（首屏）
├── 品牌理念（一句话标语 + 视觉呈现）
├── 三大品类入口（泳衣 / 手串 / 沉香）
├── 精选单品展示（6-9 个）
├── 品牌故事摘要
└── 页脚（社交链接、联系方式、备案信息）

品类页 (/collection/[category])
├── 品类氛围大图
├── 品类描述
├── 产品网格（卡片：图 + 名称 + 价格区间 + "了解详情"按钮）
└── 分页/加载更多

产品详情页 (/product/[slug])
├── 产品大图轮播（支持缩放）
├── 产品名称 + 副标题
├── 价格区间
├── 卖点标签（如"天然沉香""手工编织""速干面料"）
├── 详细描述
├── 规格参数表
├── 使用/保养说明
└── CTA 按钮："前往天猫旗舰店购买" / "咨询客服"

品牌页 (/about)
├── 品牌故事（图文）
├── 工艺/材质理念
├── 品牌愿景
└── 团队/创始人（可选）

联系页 (/contact)
├── 联系表单（姓名、邮箱、留言）
├── 联系方式（邮箱、电话、地址）
├── 社交媒体链接
└── 地图（可选）

其他页面
├── /faq — 常见问题
├── /shipping — 配送说明
└── /privacy — 隐私政策
```

### 3.2 路由设计

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 品牌首屏 + 品类入口 + 精选产品 |
| `/collection/swimwear` | 泳衣品类页 | 泳衣产品列表 |
| `/collection/bracelet` | 手串品类页 | 手串产品列表 |
| `/collection/agarwood` | 沉香品类页 | 沉香产品列表 |
| `/product/[slug]` | 产品详情页 | 动态路由，根据 slug 渲染对应产品 |
| `/about` | 品牌页 | 品牌故事与理念 |
| `/contact` | 联系页 | 联系表单与信息 |
| `/faq` | 常见问题 | 客户服务 |

---

## 四、内容管理方案

### 4.1 核心思路

采用 **"GitHub 在线编辑"模式**：
- 产品数据以 **Markdown + YAML Front Matter** 文件形式存储
- 运营人员通过 GitHub Web 界面直接编辑文件
- 保存提交后，Cloudflare Pages 自动检测变化并重新部署
- 3 分钟内完成上线

### 4.2 产品数据存放位置

```
src/content/products/
├── swimwear/          # 泳衣品类
│   ├── classic-black-bikini.md
│   └── floral-one-piece.md
├── bracelet/          # 手串品类
│   ├── sandalwood-18cm.md
│   └── agarwood-108-beads.md
└── agarwood/          # 沉香品类
    ├── vietnam-agarwood-piece.md
    └── hainan-agarwood-bracelet.md
```

### 4.3 内容文件格式

每个产品为一个 `.md` 文件，包含 YAML Front Matter（元数据）和 Markdown 正文（产品描述）。

```yaml
---
title: "越南芽庄沉香摆件"
slug: "vietnam-agarwood-piece"
category: "agarwood"
subtitle: "天然野生沉香 · 油脂饱满"
price: "¥2,800"
priceRange: "2000-5000"
images:
  - "https://cdn.fianser.com/products/agarwood-1.jpg"
  - "https://cdn.fianser.com/products/agarwood-2.jpg"
  - "https://cdn.fianser.com/products/agarwood-3.jpg"
tags: ["天然", "收藏级", "安神", "越南芽庄"]
material: "天然沉香"
weight: "约 15g"
size: "约 5cm × 3cm"
origin: "越南芽庄"
buyLink: "https://fianser.tmall.com/item/12345"
featured: true
sortOrder: 1
---

## 产品描述

天然越南芽庄沉香，油脂饱满，香气甘甜持久。芽庄沉香以其独特的凉甜韵味著称，点燃后香气层次丰富，前调清凉，中调甘甜，尾调醇厚。

## 使用建议

- 适合品香、收藏、礼赠
- 建议搭配专用香炉使用
- 存放于阴凉干燥处

## 保养说明

避免阳光直射和潮湿环境，定期检查存放状态。
```

### 4.4 运营人员更新流程

1. 登录 GitHub，进入 `fianser-web` 仓库
2. 导航至 `src/content/products/[品类]/`
3. 点击 **"Add file"** → **"Create new file"** 新增产品，或点击现有文件 **"Edit"** 修改
4. 按 YAML 模板格式填写产品信息
5. 页面底部填写提交信息（如"新增：越南芽庄沉香摆件"）
6. 点击 **"Commit changes"**
7. Cloudflare Pages 自动触发构建，约 1-3 分钟后新内容上线

### 4.5 可选增强：Decap CMS

如果运营人员希望完全脱离 GitHub 界面，可集成 **Decap CMS**（原 Netlify CMS）：
- 在网站后台提供可视化编辑界面
- 编辑后自动提交到 Git 仓库并触发部署
- 需要额外配置 OAuth 认证

> **建议**：初期使用 GitHub 在线编辑即可，运营成本低。待内容更新频率提高后再评估是否引入 Decap CMS。

---

## 五、视觉设计规范

### 5.1 设计理念

- **高端简约**：大量留白，让产品成为视觉焦点
- **克制优雅**：减少装饰元素，依靠排版和间距建立层次
- **质感优先**：高分辨率产品图，微妙的阴影和过渡动画

### 5.2 配色方案

| 角色 | 色值 | 用途 |
|------|------|------|
| **主背景** | `#FAFAF8` | 页面主背景，暖白色 |
| **卡片背景** | `#FFFFFF` | 产品卡片、内容区块 |
| **主文字** | `#1A1A1A` | 标题、正文 |
| **次要文字** | `#6B6B6B` | 描述、辅助信息 |
| **弱化文字** | `#A3A3A3` | 占位符、禁用状态 |
| **强调色** | `#C4956A` | 按钮、标签、高亮（暖金色，呼应沉香/手串的质感） |
| **强调色悬停** | `#B08555` | 按钮悬停状态 |
| **边框** | `#E5E5E5` | 分割线、卡片边框 |
| **深色区块** | `#1A1A1A` | 页脚、部分对比区块 |

### 5.3 字体规范

| 用途 | 字体 | 备选 |
|------|------|------|
| **中文标题** | Noto Serif SC | Source Han Serif CN |
| **中文正文** | Noto Sans SC | PingFang SC, Microsoft YaHei |
| **英文/数字** | Inter | system-ui |

### 5.4 间距系统

基于 Tailwind 默认间距，以 `4px` 为基准：
- 小间距：`4px, 8px, 12px, 16px`
- 中间距：`24px, 32px, 48px`
- 大间距：`64px, 96px, 128px`

### 5.5 响应式断点

| 断点 | 宽度 | 说明 |
|------|------|------|
| `sm` | 640px | 小平板 |
| `md` | 768px | 平板 |
| `lg` | 1024px | 小桌面 |
| `xl` | 1280px | 桌面 |
| `2xl` | 1536px | 大桌面 |

### 5.6 交互动效

- **页面加载**：内容淡入， stagger 延迟 100ms
- **图片悬停**：轻微放大 `scale(1.03)`，过渡 300ms ease-out
- **按钮悬停**：背景色变化 + 轻微上移 `translateY(-2px)`
- **滚动触发**：元素进入视口时淡入上浮
- **产品卡片**：悬停时显示"查看详情"遮罩层

---

## 六、项目目录结构

```
fianser-web/
├── public/                          # 静态资源（不经过构建）
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       └── logo.svg
│
├── src/
│   ├── assets/                      # 构建时处理的资源
│   │   └── styles/
│   │       └── global.css           # 全局样式
│   │
│   ├── components/                  # 可复用组件
│   │   ├── ui/                      # 基础 UI 组件
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Badge.astro
│   │   ├── layout/                  # 布局组件
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Container.astro
│   │   ├── product/                 # 产品相关组件
│   │   │   ├── ProductCard.astro
│   │   │   ├── ProductGrid.astro
│   │   │   ├── ProductGallery.astro
│   │   │   └── ProductInfo.astro
│   │   └── sections/                # 页面区块组件
│   │       ├── Hero.astro
│   │       ├── CategoryShowcase.astro
│   │       ├── FeaturedProducts.astro
│   │       ├── BrandStory.astro
│   │       └── ContactForm.astro
│   │
│   ├── content/                     # 内容数据
│   │   ├── products/                # 产品数据
│   │   │   ├── swimwear/
│   │   │   ├── bracelet/
│   │   │   └── agarwood/
│   │   └── config/                  # 内容集合配置
│   │       └── products.ts          # 产品集合 schema
│   │
│   ├── layouts/                     # 页面布局
│   │   ├── BaseLayout.astro         # 基础布局（HTML 骨架）
│   │   └── ProductLayout.astro      # 产品详情页布局
│   │
│   ├── pages/                       # 路由页面
│   │   ├── index.astro              # 首页
│   │   ├── about.astro              # 品牌页
│   │   ├── contact.astro            # 联系页
│   │   ├── faq.astro                # 常见问题
│   │   ├── collection/
│   │   │   └── [category].astro     # 品类页（动态路由）
│   │   └── product/
│   │       └── [slug].astro         # 产品详情页（动态路由）
│   │
│   ├── utils/                       # 工具函数
│   │   ├── products.ts              # 产品数据读取
│   │   └── helpers.ts               # 通用辅助函数
│   │
│   └── env.d.ts                     # TypeScript 类型声明
│
├── functions/                       # Cloudflare Pages Functions
│   └── api/
│       └── contact.ts               # 联系表单 API
│
├── astro.config.mjs                 # Astro 配置
├── tailwind.config.mjs              # Tailwind 配置
├── tsconfig.json                    # TypeScript 配置
├── package.json                     # 依赖管理
└── README.md                        # 项目说明
```

---

## 七、部署实施步骤

### 7.1 环境准备

- Node.js >= 18
- npm >= 9
- Git
- GitHub 账号
- Cloudflare 账号

### 7.2 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/fianser/fianser-web.git
cd fianser-web

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 构建生产版本
npm run build

# 5. 预览生产构建
npm run preview
```

### 7.3 Astro 配置（astro.config.mjs）

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // 输出模式：静态生成
  output: 'static',

  // 站点地址（用于生成 sitemap 和绝对链接）
  site: 'https://fianser.com',

  // 集成
  integrations: [
    tailwind(),
  ],

  // 内容集合配置
  content: {
    // 产品集合配置在 src/content/config.ts 中
  },
});
```

### 7.4 Cloudflare Pages 部署配置

#### 方式一：Git 集成（推荐）

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create** → **Pages**
3. 点击 **"Connect to Git"**
4. 授权 Cloudflare 访问 GitHub 账号
5. 选择 `fianser-web` 仓库
6. 构建设置：
   - **Project name**: `fianser-web`
   - **Production branch**: `main`
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. 点击 **Save and Deploy**

#### 方式二：Wrangler CLI（命令行部署）

```bash
# 1. 安装 Wrangler
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 部署
wrangler pages deploy dist --project-name=fianser-web
```

### 7.5 环境变量配置

在 Cloudflare Pages 项目设置中配置：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NODE_VERSION` | `18` | Node.js 版本 |
| `SITE_URL` | `https://fianser.com` | 站点地址 |

---

## 八、域名与 DNS 配置

### 8.1 绑定自定义域名

1. 在 Cloudflare Pages 项目 → **Custom domains**
2. 点击 **"Set up a custom domain"**
3. 输入 `fianser.com`，点击 **"Continue"**
4. 输入 `www.fianser.com`，点击 **"Continue"**

### 8.2 腾讯云 DNS 配置

登录 [腾讯云 DNS 解析控制台](https://console.cloud.tencent.com/cns)，为域名添加以下记录：

| 主机记录 | 记录类型 | 记录值 | TTL |
|----------|----------|--------|-----|
| `@` | CNAME | `fianser-web.pages.dev` | 600 |
| `www` | CNAME | `fianser-web.pages.dev` | 600 |

> **注意**：如果腾讯云不支持根域名的 CNAME 记录（部分 DNS 服务商限制），可采用以下方案：
> - 方案 A：将域名 DNS 服务器切换至 Cloudflare（推荐，功能最全）
> - 方案 B：使用 A 记录指向 Cloudflare Pages 的 IP（具体 IP 在绑定过程中 Cloudflare 会提示）
> - 方案 C：使用腾讯云 CDN 回源到 `fianser-web.pages.dev`

### 8.3 SSL/HTTPS

Cloudflare Pages 自动为自定义域名签发并续期 **SSL 证书**，无需手动操作。

### 8.4 备案说明

- Cloudflare Pages 服务器位于**海外**
- 域名 `fianser.com` 已在腾讯云注册
- 如果域名已完成 **ICP 备案**，绑定海外服务器在技术上可行
- 如需严格合规，可考虑：
  - **腾讯云轻量服务器（香港节点）**：免备案，国内访问速度快
  - **腾讯云静态网站托管 + CDN**：完全合规，但配置稍复杂

> **建议**：先使用 Cloudflare Pages 部署并绑定域名，实际访问体验最佳。如后续有合规要求，可迁移至腾讯云方案。

---

## 九、运营人员操作指南

### 9.1 添加新产品

1. 打开浏览器，访问 `https://github.com/fianser/fianser-web`
2. 点击 `src/content/products/`，进入对应品类文件夹
3. 点击右上角 **"Add file"** → **"Create new file"**
4. 文件名格式：`产品名称英文小写-连字符.md`（如 `vietnam-agarwood-piece.md`）
5. 按以下模板填写内容：

```yaml
---
title: "产品名称"
slug: "产品-url-标识"
category: "swimwear|bracelet|agarwood"
price: "¥价格"
images:
  - "图片URL1"
  - "图片URL2"
tags: ["标签1", "标签2"]
buyLink: "购买链接"
---

产品描述内容...
```

6. 页面底部填写提交信息：
   - **Commit message**: `新增：产品名称`
   - 选择 **"Commit directly to the main branch"**
7. 点击 **"Commit new file"**
8. 等待 1-3 分钟，访问网站查看效果

### 9.2 修改产品信息

1. 进入 `src/content/products/[品类]/` 文件夹
2. 点击要修改的产品文件
3. 点击右上角 **铅笔图标**（Edit）
4. 修改内容
5. 填写提交信息（如 `更新：越南沉香价格`）
6. 点击 **"Commit changes"**

### 9.3 删除产品

1. 进入产品文件页面
2. 点击右上角 **垃圾桶图标**（Delete）
3. 确认删除并提交

### 9.4 查看部署状态

1. 访问 Cloudflare Pages 项目页面
2. 查看 **Deployments** 标签
3. 绿色勾表示部署成功，红色叉表示失败
4. 点击具体部署可查看构建日志

---

## 十、与 GitHub Pages 对比

| 对比维度 | GitHub Pages | Cloudflare Pages | 结论 |
|----------|-------------|------------------|------|
| **框架支持** | 原生仅 Jekyll，其他需 GitHub Actions | 原生支持 Astro、Next.js、Nuxt 等所有主流框架 | Cloudflare 对 Astro 支持更好，无需额外 CI 配置 |
| **构建配置** | 需手动编写 `.github/workflows/` | 自动识别框架，一键配置 | Cloudflare 更简单 |
| **全球 CDN** | 有，但节点较少 | 300+ 边缘节点，HTTP/3、Brotli | Cloudflare 更快，尤其图片加载 |
| **边缘计算** | ❌ 不支持 | ✅ Pages Functions（免费 API） | Cloudflare 可处理表单，无需额外服务器 |
| **预览部署** | ❌ 不支持 | ✅ 每分支自动生成预览链接 | Cloudflare 方便运营预览 |
| **图片优化** | ❌ 无 | ✅ Cloudflare Images 自动优化 | Cloudflare 大幅节省流量 |
| **自定义域名** | 支持，基础配置 | 支持，自动 SSL、高级重定向 | Cloudflare 更专业 |
| **免费额度** | 1GB 带宽/月，10 万次请求 |  generous 带宽，无限请求 | Cloudflare 更适合品牌站流量增长 |
| **私有仓库** | 需 GitHub Pro | 免费支持 | Cloudflare 更友好 |

**结论**：对于 fianser 这种需要 Astro 框架、大量产品图、追求极致性能的品牌站，Cloudflare Pages 是更专业、更长远的选择。

---

## 十一、附录：产品数据模板

### 11.1 泳衣产品模板

```yaml
---
title: "经典黑色比基尼"
slug: "classic-black-bikini"
category: "swimwear"
subtitle: "极简设计 · 高弹面料"
price: "¥399"
priceRange: "300-500"
images:
  - "https://cdn.fianser.com/products/swimwear-001-1.jpg"
  - "https://cdn.fianser.com/products/swimwear-001-2.jpg"
  - "https://cdn.fianser.com/products/swimwear-001-3.jpg"
tags: ["比基尼", "黑色", "高弹", "速干"]
material: "82% 锦纶 + 18% 氨纶"
size: "S / M / L"
color: "经典黑"
buyLink: "https://fianser.tmall.com/item/swimwear-001"
featured: true
sortOrder: 1
---

## 产品描述

经典黑色比基尼，采用高弹锦纶面料，贴合身形不紧绷。速干科技，出水即干，舒适透气。

## 设计亮点

- 极简三角杯设计，修饰胸型
- 可调节肩带，适配不同身形
- 高腰泳裤，拉长腿部线条

## 洗涤说明

- 手洗，水温不超过 30°C
- 不可漂白
- 阴凉处晾干
```

### 11.2 手串产品模板

```yaml
---
title: "越南沉香 108 颗佛珠"
slug: "vietnam-agarwood-108-beads"
category: "bracelet"
subtitle: "天然沉香 · 手工打磨"
price: "¥1,680"
priceRange: "1000-2000"
images:
  - "https://cdn.fianser.com/products/bracelet-001-1.jpg"
  - "https://cdn.fianser.com/products/bracelet-001-2.jpg"
tags: ["沉香", "108颗", "佛珠", "越南"]
material: "天然越南沉香"
beadSize: "8mm"
weight: "约 25g"
origin: "越南"
buyLink: "https://fianser.tmall.com/item/bracelet-001"
featured: true
sortOrder: 1
---

## 产品描述

精选越南天然沉香，手工打磨 108 颗佛珠。油脂线清晰，香气醇厚，佩戴或盘玩皆宜。

## 产品特点

- 108 颗标准佛珠，寓意圆满
- 8mm 珠径，男女皆宜
- 天然沉香，越盘越润

## 保养建议

- 避免接触水、汗、化学品
- 不佩戴时存放于密封袋中
- 定期以干净棉布擦拭
```

### 11.3 沉香产品模板

```yaml
---
title: "海南沉香原材"
slug: "hainan-agarwood-raw"
category: "agarwood"
subtitle: "野生老料 · 油脂饱满"
price: "¥5,800"
priceRange: "5000-10000"
images:
  - "https://cdn.fianser.com/products/agarwood-001-1.jpg"
  - "https://cdn.fianser.com/products/agarwood-001-2.jpg"
  - "https://cdn.fianser.com/products/agarwood-001-3.jpg"
tags: ["沉香", "海南", "原材", "收藏级"]
material: "天然海南沉香"
weight: "约 30g"
size: "约 8cm × 5cm × 3cm"
origin: "中国海南"
buyLink: "https://fianser.tmall.com/item/agarwood-001"
featured: false
sortOrder: 3
---

## 产品描述

海南沉香原材，野生老料，油脂饱满，香气甘甜清凉。海南沉香以其独特的"凉甜"韵味闻名，是沉香中的上品。

## 品香建议

- 适合电子熏香炉，温度 120-150°C
- 亦可传统隔火熏香
- 每次用量 0.1-0.3g

## 收藏价值

海南野生沉香资源日益稀缺，具有很高的收藏和升值空间。
```

---

## 十二、后续迭代建议

| 阶段 | 功能 | 优先级 |
|------|------|--------|
| **V1.0** | 品牌展示 + 产品展示 + 引流 | 高 |
| **V1.1** | 联系表单功能（Pages Functions） | 高 |
| **V1.2** | 搜索功能（客户端搜索） | 中 |
| **V1.3** | 多语言支持（中英双语） | 中 |
| **V2.0** | 接入 Decap CMS，可视化内容管理 | 中 |
| **V2.1** | 产品筛选与排序功能 | 低 |
| **V2.2** | 用户评论/评分系统 | 低 |
| **V3.0** | 独立电商功能（购物车 + 支付） | 视业务发展 |

---

*文档版本：v1.0*  
*创建日期：2026-05-22*  
*交付对象：CodeArts*
