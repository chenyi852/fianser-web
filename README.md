# fianser 品牌官网

高端生活方式品牌官网，展示泳衣、手串、沉香等精致产品。

## 技术栈

- **框架**: Astro 5.x
- **样式**: Tailwind CSS 3.x
- **语言**: TypeScript 5.x
- **部署**: Cloudflare Pages
- **图片存储**: Cloudflare Images

## 项目结构

```
fianser-web/
├── src/
│   ├── assets/styles/      # 全局样式
│   ├── components/         # 可复用组件
│   │   ├── ui/            # 基础 UI 组件
│   │   ├── layout/        # 布局组件
│   │   ├── product/       # 产品相关组件
│   │   └── sections/      # 页面区块组件
│   ├── content/           # 内容数据
│   │   └── products/      # 产品 Markdown 文件
│   ├── layouts/           # 页面布局
│   ├── pages/             # 路由页面
│   └── utils/             # 工具函数
├── public/                # 静态资源
└── dist/                  # 构建输出
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 内容管理

产品数据存储在 `src/content/products/` 目录下，按品类分类：

- `swimwear/` - 泳衣
- `bracelet/` - 手串
- `agarwood/` - 沉香

每个产品为一个 Markdown 文件，包含 YAML Front Matter 元数据：

```yaml
---
title: "产品名称"
slug: "product-slug"
category: "swimwear|bracelet|agarwood"
price: "¥399"
images:
  - "https://cdn.fianser.com/products/xxx.jpg"
tags: ["标签1", "标签2"]
buyLink: "https://fianser.tmall.com/item/xxx"
featured: true
---

产品描述内容...
```

### 添加新产品

1. 在对应品类目录下创建 `.md` 文件
2. 按 YAML 模板填写产品信息
3. 保存后自动重新构建

## 部署

### Cloudflare Pages

1. 连接 GitHub 仓库
2. 构建命令: `npm run build`
3. 输出目录: `dist`
4. 环境变量: `NODE_VERSION=18`

### 自定义域名

在 Cloudflare Pages 项目设置中绑定域名 `fianser.com`。

## 设计规范

### 配色

- 主背景: `#FAFAF8`
- 强调色: `#C4956A` (暖金色)
- 主文字: `#1A1A1A`
- 次要文字: `#6B6B6B`

### 字体

- 中文标题: Noto Serif SC
- 中文正文: Noto Sans SC
- 英文/数字: Inter

## 许可证

ISC
