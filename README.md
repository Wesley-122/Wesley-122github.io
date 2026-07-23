# LKtechnology 企业官网 - 完整项目文档

**广西箩筐信息科技有限公司 (LKtechnology) 企业官网**
- 技术栈: Next.js 16 + React 19 + Tailwind CSS v4 + Shadcn UI + next-intl + Framer Motion
- CMS: Strapi v5 无头CMS
- 部署: 本地内网 → 华为云ECS
- 域名: www.lk-it.cn

---

## 目录

1. [项目架构](#一项目架构)
2. [本地部署教程](#二本地部署教程)
3. [全站中英双语文案](#三全站中英双语页面内容)
4. [视觉设计规范](#四全局视觉色彩字体组件规范)
5. [页面板块分镜设计](#五页面分镜设计说明)
6. [SEO自动化配置](#六seo自动化配置)
7. [表单系统](#七表单系统)
8. [华为云迁移方案](#八华为云迁移完整操作手册)
9. [开发排期](#九项目开发落地排期)
10. [CMS数据模型](#十strapi-cms数据模型设计)

---

## 一、项目架构

### 目录结构

```
E:/箩筐官网开发/
├── frontend/                          # Next.js 16 前端项目
│   ├── public/
│   │   └── images/                    # 本地素材目录
│   │       ├── logo/                  # 品牌LOGO素材
│   │       ├── hero/                  # 首屏背景图
│   │       ├── team/                  # 团队成员照片
│   │       ├── certifications/        # 资质证书扫描件
│   │       ├── clients/               # 合作客户LOGO
│   │       └── cases/                 # 案例截图
│   ├── messages/
│   │   ├── zh-CN.json                 # 中文翻译文件
│   │   └── en.json                    # 英文翻译文件
│   └── src/
│       ├── app/
│       │   ├── [locale]/              # 双语路由 (/zh-CN, /en)
│       │   │   ├── page.tsx           # 首页
│       │   │   ├── who-we-are/        # 关于我们
│       │   │   ├── products-services/ # 产品与服务
│       │   │   ├── industry-solutions/# 行业解决方案
│       │   │   ├── cases/             # 成功案例
│       │   │   ├── news/              # 新闻动态
│       │   │   ├── careers/           # 人才招聘
│       │   │   └── contact/           # 联系我们
│       │   ├── api/                   # API路由 (表单提交)
│       │   ├── sitemap.ts             # 动态站点地图
│       │   └── robots.ts              # 爬虫规则
│       ├── components/
│       │   ├── layout/                # Header, Footer, LanguageSwitcher
│       │   ├── sections/              # HeroSection, FeatureGrid, LogoWall等
│       │   ├── forms/                 # ContactForm, ResumeForm, DemoForm等
│       │   ├── ui/                    # Shadcn UI组件 (Button, Card, Input等)
│       │   └── shared/                # SectionWrapper, SectionHeading等
│       ├── lib/                       # api-client, constants, utils, validators
│       ├── i18n/                      # 国际化路由配置
│       └── types/                     # TypeScript类型定义
│
├── cms/                               # Strapi v5 后端CMS
│   ├── config/                        # 数据库、服务器、插件配置
│   ├── src/api/                       # 内容类型API
│   └── public/uploads/                # 上传的媒体文件
│
└── README.md                          # 本文档
```

### 技术栈详情

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2 | SSR+SSG混合渲染 |
| React | 19 | UI组件框架 |
| Tailwind CSS | v4 | 原子化CSS |
| Shadcn UI | latest | UI组件库 |
| next-intl | latest | 双语国际化 |
| Framer Motion | latest | 轻量动效 |
| Zod | 4.4 | 表单验证 |
| Strapi | 5.x | 无头CMS |
| SQLite | 3.x | 本地数据库 |

### 渲染策略

| 页面类型 | 渲染策略 | 更新频率 |
|----------|---------|---------|
| 首页 | ISR | 60s |
| 关于我们 | ISR | 3600s |
| 产品/方案 | ISR | 3600s |
| 案例列表 | ISR | 300s |
| 案例详情 | SSG | 构建时 |
| 新闻 | ISR | 60s |
| 招聘 | ISR | 300s |
| 联系我们 | SSG | 构建时 |

### 前后端交互流程

```
用户浏览器 → Next.js前端(:3000) → Strapi API(:1337) → SQLite数据库
                ↑                        ↑
           ISR缓存+SSG              REST API (JSON)
```

---

## 二、本地部署教程

### 2.1 环境要求

- **操作系统**: Windows 10/11 (64位)
- **Node.js**: v20 LTS (推荐，v24需额外配置)
- **npm**: v10+
- **Git**: 可选

### 2.2 安装Node.js

```bash
# 推荐使用 nvm-windows 管理Node版本
# 下载: https://github.com/coreybutler/nvm-windows

# 安装Node.js 20 LTS
nvm install 20.18.0
nvm use 20.18.0

# 验证安装
node --version  # v20.18.0
npm --version   # v10.x
```

> **注意**: 当前环境Node.js v24，Strapi CMS的better-sqlite3原生模块编译需要Node.js v20 LTS。前端Next.js可以在v24上正常运行。

### 2.3 启动前端 (Next.js)

```bash
# 1. 进入前端目录
cd E:/箩筐官网开发/frontend

# 2. 安装依赖
npm install

# 3. 开发模式启动
npm run dev
# → 访问 http://localhost:3000

# 4. 生产构建
npm run build
npm run start
# → 访问 http://localhost:3000
```

### 2.4 启动CMS后台 (Strapi)

```bash
# 1. 确保使用Node.js v20 (better-sqlite3编译需要)
nvm use 20.18.0

# 2. 进入CMS目录
cd E:/箩筐官网开发/cms

# 3. 安装依赖
npm install

# 4. 启动开发模式
npm run develop
# → 访问 http://localhost:1337/admin
# → 首次访问创建管理员账号

# 5. 生产模式
npm run build
npm run start
```

### 2.5 内网访问配置

```bash
# 1. 获取本机内网IP
ipconfig
# 找到 "IPv4 地址" 例如: 192.168.1.100

# 2. 启动前端 (监听所有网络接口)
cd frontend
npm run dev -- -H 0.0.0.0

# 3. 配置Windows防火墙
# 控制面板 → Windows Defender防火墙 → 高级设置 → 入站规则
# 新建规则 → 端口 → TCP → 3000, 1337 → 允许连接

# 4. 其他设备访问
# 浏览器打开: http://192.168.1.100:3000
```

### 2.6 PM2进程管理 (生产环境)

```bash
# 安装PM2
npm install -g pm2

# 启动Strapi
cd E:/箩筐官网开发/cms
pm2 start npm --name "lk-cms" -- run start

# 启动Next.js
cd E:/箩筐官网开发/frontend
pm2 start node_modules/.bin/next --name "lk-frontend" -- start

# 保存PM2配置
pm2 save
pm2 startup
```

---

## 三、全站中英双语页面内容

### 3.1 首页 (Home)

**中文**:
- Hero标题: "以数据驱动制造，以技术重塑工业"
- Hero副标题: "专注数据治理与工业互联网，为制造企业提供全链路数字化解决方案"
- CTA按钮: "预约演示" / "了解我们的产品"
- 核心业务: 全链路数据治理 / 制造业定制系统开发 / 技术人力外包
- 客户: 柳钢集团、上汽通用五菱、柳工集团、唐人神、赛克瑞浦、大丰禽业、柳钢东信、OK出行

**English**:
- Hero: "Drive Manufacturing with Data, Reshape Industry with Technology"
- Subtitle: "Full-chain digital solutions for manufacturing enterprises through data governance and industrial internet"
- CTA: "Schedule Demo" / "Our Products"
- Core Business: Full-Chain Data Governance / Custom Manufacturing Systems / IT Talent Outsourcing

### 3.2 关于我们 (Who We Are)

**中文**:
- 企业简介: 广西箩筐信息科技有限公司成立于2020年，专注数据治理与工业互联网，总部位于广西柳州。70+精英团队，90%技术研发人员，DAMA中国认证实施团队。
- 使命: 以数据与技术赋能制造业，推动工业智能化升级
- 愿景: 成为国内领先的工业互联网与数据治理服务商
- 核心价值观: 技术驱动 / 客户至上 / 务实创新
- 发展历程: 2020公司成立 → 2021 DAMA认证 → 2022 华为云精英服务商 → 2023 高新技术企业 → 2024 标杆项目落地 → 2025 行业深耕
- 资质荣誉: 国家高新技术企业、华为云精英服务商、DAMA中国认证实施团队、柳州市互联网协会会员、多项软件著作权

**English**:
- About: LKtechnology founded in 2020, headquartered in Liuzhou, Guangxi. 70+ professionals, 90% R&D, DAMA China certified.
- Mission: Empower manufacturing with data and technology, driving industrial intelligence
- Vision: Become China's leading industrial internet and data governance service provider
- Core Values: Tech-Driven / Client First / Practical Innovation
- History: 2020 Founded → 2021 DAMA Certified → 2022 Huawei Cloud Partner → 2023 High-Tech Enterprise → 2024 Benchmark Projects → 2025 Industry Expansion
- Certifications: National High-Tech Enterprise, Huawei Cloud Elite Service Partner, DAMA China Certified Team, Liuzhou Internet Association Member, Multiple Software Copyrights

### 3.3 产品与服务 (Products & Services)

**三大分类**:

1. **数据产品** (Data Products): 数据中台、ETL/iPaaS、BI可视化&数据大屏、数据资产全生命周期管理
2. **企业应用** (Enterprise Apps): MES、ERP、CRM、SCM/WMS、EMS、轧辊管理系统
3. **人才服务** (Talent Services): 驻场开发、项目实施、运维服务

### 3.4 行业解决方案 (Industry Solutions)

**六大行业**:
1. **冶金** (Metallurgy): 数据中台、MES、能源管理、轧辊管理
2. **汽车制造** (Automotive): 供应链管理、工艺文件管理、生产执行、质量追溯
3. **畜牧农业** (Agriculture): 养殖全产业链数据治理、销售管理、供应链追溯
4. **物流运输** (Logistics): 物流一体化平台、TMS、WMS、司机运营管理
5. **新能源环保** (New Energy): 电池能源管理平台、碳排放监测、能效优化
6. **通用制造** (General Mfg): ERP/MES/CRM/SCM/WMS通用系统

### 3.5 成功案例 (Success Cases)

**8个标杆项目**:
1. 柳钢物流一体化数据中台 | Liugang Logistics Data Middle Platform
2. 宝骏工艺文件管理系统 | Baojun Process Document Management
3. 柳钢中金轧辊全生命周期管理系统 | Liugang Roll Lifecycle Management
4. 大丰禽业全产业链数据治理 | Dafeng Poultry Data Governance
5. 赛克瑞浦动力电池能源管理平台 | Saikeruipu Battery Energy Management
6. 东信dedge工业物联网平台 | Dongxin dedge IIoT Platform
7. 唐人神生猪销售管理系统 | TRS Pig Sales Management System
8. OK出行司机运营管理系统 | OK Chuxing Driver Operations System

### 3.6 新闻动态 (News)

**分类**: 企业资讯 / 技术干货 / 行业洞察
**种子文章**:
1. 箩筐科技荣获国家高新技术企业认定 (2025-06-15)
2. 箩筐科技成为华为云精英服务商 (2025-03-20)
3. 制造业数据治理的三大关键挑战与应对策略 (2025-02-10)
4. MES系统选型与实施指南：制造企业必读 (2025-01-18)
5. 2025工业互联网发展趋势与展望 (2025-01-05)
6. 箩筐科技团队突破70人，加速全国业务布局 (2024-12-01)

### 3.7 人才招聘 (Careers)

**职位示例**:
- Java高级开发工程师 | Senior Java Developer (10K-18K)
- 前端开发工程师 | Frontend Developer (8K-15K)
- 数据治理工程师 | Data Governance Engineer (12K-20K)
- 项目经理（工业互联网）| Project Manager (IIoT) (15K-25K)
- 技术实习生（2026届）| Tech Intern (3K-5K)

### 3.8 联系我们 (Contact Us)

**联系信息**:
- 地址: 广西柳州市城中区东环大道256号万达中心5楼
- Address: 5F, Wanda Center, 256 Donghuan Ave, Chengzhong District, Liuzhou, Guangxi, China
- 电话/Phone: +86 772-1234567
- 邮箱/Email: info@lk-it.cn
- 工作时间: 周一至周五 9:00-18:00 / Mon-Fri 9:00-18:00

---

## 四、全局视觉、色彩、字体、组件规范

### 4.1 品牌色彩

| Token | 色值 | 用途 |
|-------|------|------|
| `primary` | `#1947b3` | 主品牌蓝：按钮、链接、标题高亮、导航激活态 |
| `primary-light` | `#3d6fd9` | Hover悬停态 |
| `primary-dark` | `#12378f` | 深色背景渐变 |
| `accent` | `#36a2d0` | 辅助青蓝：徽章、图标、装饰 |
| `accent-light` | `#e8f4f9` | 辅助色浅底 |
| `footer-bg` | `#0f172a` | 深色页脚 |
| `neutral-50` | `#f8fafc` | 交替区域背景 |
| Background | `#ffffff` | 主背景白色 |
| Text Primary | `#1e293b` | 正文深灰 |
| Text Secondary | `#64748b` | 辅助文字灰色 |

### 4.2 字体系统

```css
/* 中文优先 */
font-family: 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;

/* 英文优先 */
font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;

/* 最终组合 */
--font-sans: 'Inter', 'SF Pro Display', -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
```

### 4.3 排版规范

| 层级 | 移动端 | 桌面端 | 字重 |
|------|--------|--------|------|
| H1 | 36px | 48-60px | Bold (700) |
| H2 | 28px | 36px | Semibold (600) |
| H3 | 22px | 28px | Semibold (600) |
| H4 | 18px | 22px | Semibold (600) |
| Body | 16px | 16px | Regular (400) |
| Small | 14px | 14px | Regular (400) |
| Caption | 12px | 12px | Medium (500) |

### 4.4 组件设计原则 (对标腾讯官网)

1. **大留白**: 段落间距≥24px，模块间距≥80px
2. **克制阴影**: 卡片阴影 `0 1px 3px rgba(0,0,0,0.04)`，hover时 `0 4px 12px rgba(0,0,0,0.08)`
3. **微妙圆角**: 按钮8px，卡片12px，大容器16px
4. **细线分隔**: 1px solid #e2e8f0
5. **渐变动效**: 微交互使用200-300ms transition
6. **深浅交替**: 白色底与#f8fafc浅灰底交替
7. **无花哨动画**: 仅使用Framer Motion淡入上移，无弹跳旋转等特效
8. **克制配色**: 主体白+灰+工业蓝点缀，无渐变彩色区域

### 4.5 按钮规范

| 类型 | 样式 | 用途 |
|------|------|------|
| 主按钮 | bg-primary + 白色文字 + 阴影 | 主要CTA |
| 次按钮 | 白色底 + 灰色边框 | 辅助操作 |
| 描边按钮 | 白色底 + primary边框 | 查看详情 |
| 文字按钮 | 仅文字颜色 | 导航、链接 |

### 4.6 卡片规范

```css
.card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: all 0.3s;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
```

---

## 五、页面分镜设计说明

### 5.1 首页 (Tencent式认知漏斗)

| 屏序 | 板块 | 内容 | 元素 | 交互 |
|------|------|------|------|------|
| 1 | Hero首屏 | 品牌Slogan + 核心业务概括 + 双CTA按钮 | 工业蓝渐变背景 + 几何装饰 + 数据亮点(70+/90%/2020/DAMA) | Framer Motion渐入动画 + 数字滚动 |
| 2 | 核心业务 | 3列卡片 | DB图标/Code图标/Users图标 + 标题 + 描述 + 了解更多链接 | Hover上浮 + 图标变色 |
| 3 | 客户Logo墙 | 8个客户logo | 无限滚动轮播 + 渐变遮罩 | 自动滚动 |
| 4 | 标杆案例 | 3个精选案例卡片 | 缩略图 + 行业标签 + 技术标签 + 详情链接 | Hover图片放大 + 箭头移动 |
| 5 | 新闻动态 | 3篇文章卡片 | 封面图 + 分类标签 + 日期 + 摘要 | Hover标题变色 |
| 6 | CTA转化 | 预约演示/在线咨询 | 渐变蓝底 + 双按钮 + 装饰圆 | Hover按钮缩放 |

### 5.2 关于我们

| 板块 | 内容 | 布局 |
|------|------|------|
| 页头 | 标题 + 副标题 | 渐变蓝底全宽 |
| 企业简介 | 公司介绍文字 | 居中最大宽度 |
| 使命愿景 | 使命 + 愿景 | 2列卡片 |
| 核心价值观 | 3个价值观 | 3列卡片 |
| 发展历程 | 6个里程碑 | 中间时间轴左右交替 |
| 资质荣誉 | 5个证书 | 3列卡片网格 |
| CTA | 了解更多合作 | 渐变横幅 |

### 5.3 产品与服务

| 板块 | 内容 | 布局 |
|------|------|------|
| 页头 | 标题 | 渐变蓝底 |
| Tab切换 | 数据产品/企业应用/人才服务 | 居中Tab栏 |
| 产品网格 | 每个类别3-6个产品卡片 | 2-3列响应式网格 |

### 5.4 行业解决方案

| 板块 | 内容 | 布局 |
|------|------|------|
| 页头 | 标题 | 渐变蓝底 |
| 行业卡片 | 6个行业 | 3列网格，每个含图标+标题+描述+链接 |

### 5.5 成功案例

| 板块 | 内容 | 布局 |
|------|------|------|
| 页头 | 标题 + 副标题 | 渐变蓝底 |
| 案例网格 | 8个案例卡片 | 3列网格 |

### 5.6 新闻动态

| 板块 | 内容 | 布局 |
|------|------|------|
| 页头 | 标题 | 渐变蓝底 |
| 文章列表 | 文章卡片 | 3列网格 + 分页 |

### 5.7 人才招聘

| 板块 | 内容 | 布局 |
|------|------|------|
| 页头 | 标题 | 渐变蓝底 |
| 职位列表 | 职位卡片行 | 单列列表 + 每行含类型标签/部门/薪资 |

### 5.8 联系我们

| 板块 | 内容 | 布局 |
|------|------|------|
| 页头 | 标题 | 渐变蓝底 |
| 联系表单 | 姓名/邮箱/公司/电话/内容 | 左侧3/5宽 |
| 联系信息 | 地址/电话/邮箱/时间/地图 | 右侧2/5宽 |

---

## 六、SEO自动化配置

### 6.1 Meta模板

```ts
// 中文模板
title: "%s | LKtechnology箩筐信息科技-广西工业互联网&数据治理服务商"
description: "广西箩筐信息科技有限公司(LKtechnology)专注数据治理与工业互联网..."
keywords: "广西数据治理, 柳州MES开发, 工业互联网平台, 制造业数据中台, ..."

// 英文模板
title: "%s | LKtechnology - Industrial Internet & Data Governance Provider"
description: "LKtechnology specializes in data governance and industrial internet..."
```

### 6.2 Sitemap

- 自动生成位置: `/sitemap.xml`
- 包含所有静态页面 + 动态案例页面
- 双语言hreflang标注
- 分级权重: 首页1.0 → 关于/案例0.9 → 方案/新闻0.8 → 招聘0.7

### 6.3 Robots.txt

- 自动生成位置: `/robots.txt`
- 允许所有爬虫(含Baiduspider)
- 禁止: `/api/`, `/admin/`

### 6.4 JSON-LD结构化数据

- **Organization**: 关于页面 - 公司名、Logo、地址、联系方式
- **BreadcrumbList**: 面包屑导航
- **Article**: 新闻详情页
- **JobPosting**: 招聘职位详情页

### 6.5 图片SEO

- 所有图片使用next/image自动WebP压缩
- alt标签强制配置
- 图片文件名使用描述性命名
- 案例/方案/新闻图片最高抓取优先级

---

## 七、表单系统

### 7.1 在线咨询表单

| 字段 | 类型 | 必填 | 验证 |
|------|------|------|------|
| 姓名 | text | 是 | 2-50字符 |
| 邮箱 | email | 是 | 邮箱格式 |
| 公司 | text | 否 | ≤100字符 |
| 电话 | tel | 否 | 7-20位数字 |
| 咨询内容 | textarea | 是 | 10-2000字符 |

- API: `POST /api/contact`
- 存储: Strapi ContactSubmission集合
- 状态: idle → submitting → success/error

### 7.2 简历投递表单

| 字段 | 类型 | 必填 | 验证 |
|------|------|------|------|
| 姓名 | text | 是 | 2-50字符 |
| 邮箱 | email | 是 | 邮箱格式 |
| 电话 | tel | 是 | 7-20位 |
| 意向职位 | select | 是 | 从活跃职位选择 |
| 简历附件 | file | 否 | PDF/DOC/DOCX, ≤10MB |
| 自荐信 | textarea | 否 | ≤3000字符 |

- API: `POST /api/resume` (multipart/form-data)
- 存储: Strapi ResumeSubmission集合 + Media Library

### 7.3 项目预约演示表单

| 字段 | 类型 | 必填 | 验证 |
|------|------|------|------|
| 姓名 | text | 是 | 2-50字符 |
| 公司 | text | 是 | ≤100字符 |
| 邮箱 | email | 是 | 邮箱格式 |
| 电话 | tel | 是 | 7-20位 |
| 产品兴趣 | select | 否 | 从产品列表选择 |
| 期望日期 | date | 否 | 日期格式 |
| 补充说明 | textarea | 否 | ≤1000字符 |

- API: `POST /api/demo`
- 存储: Strapi DemoRequest集合

### 7.4 资料下载表单

| 字段 | 类型 | 必填 | 验证 |
|------|------|------|------|
| 姓名 | text | 是 | 2-50字符 |
| 邮箱 | email | 是 | 邮箱格式 |
| 公司 | text | 否 | ≤100字符 |
| 隐私同意 | checkbox | 是 | 必须勾选 |

- 提交后触发PDF下载
- 存储: Strapi PdfDownloadRecord集合

### 7.5 表单UI状态

所有表单统一4态管理:
1. **idle**: 默认表单显示
2. **submitting**: 按钮显示加载动画，输入框禁用
3. **success**: 绿色对勾 + 成功消息 + 表单隐藏
4. **error**: 红色错误提示 + 重试选项

---

## 八、华为云迁移完整操作手册

### 8.1 前置准备

1. 注册华为云账号并实名认证
2. 购买ECS云服务器 (推荐: 2vCPU 4GB CentOS 7.9)
3. 购买OSS对象存储桶 (存放图片/PDF等静态文件)
4. 域名 `www.lk-it.cn` 已完成ICP备案
5. DNS解析: A记录 → ECS公网IP

### 8.2 ECS环境配置

```bash
# 1. SSH登录ECS
ssh root@<ECS公网IP>

# 2. 安装Node.js 20 LTS
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs
node --version  # v20.x

# 3. 安装Nginx
yum install -y nginx
systemctl enable nginx
systemctl start nginx

# 4. 安装PM2
npm install -g pm2

# 5. 创建项目目录
mkdir -p /var/www/lk-website
```

### 8.3 上传项目文件

```bash
# 从本地Windows上传到ECS (使用scp或其他SFTP工具)
# 上传以下目录:
# - frontend/  → /var/www/lk-website/frontend
# - cms/       → /var/www/lk-website/cms
```

### 8.4 数据库迁移

```bash
# SQLite数据库文件直接复制
# 将 cms/.tmp/data.db 上传到服务器的相同路径
# SQLite无需额外安装，Strapi启动时自动识别
```

### 8.5 媒体文件迁移至OSS

```bash
# 1. 在Strapi中安装OSS上传插件
cd /var/www/lk-website/cms
npm install @strapi/provider-upload-huawei-oss

# 2. 配置 cms/config/plugins.ts
export default {
  upload: {
    config: {
      provider: 'huawei-oss',
      providerOptions: {
        accessKeyId: process.env.HW_ACCESS_KEY,
        secretAccessKey: process.env.HW_SECRET_KEY,
        endpoint: process.env.HW_OSS_ENDPOINT,
        bucket: process.env.HW_OSS_BUCKET,
      },
    },
  },
};

# 3. 上传现有文件到OSS
# 通过华为云控制台或ossutil工具上传 cms/public/uploads/ 到OSS桶
```

### 8.6 环境变量配置

```bash
# frontend/.env.production
NEXT_PUBLIC_STRAPI_URL=https://www.lk-it.cn
NEXT_PUBLIC_SITE_URL=https://www.lk-it.cn
REVALIDATION_SECRET=<随机密钥>
```

### 8.7 Nginx反向代理配置

```nginx
# /etc/nginx/conf.d/lk-it.cn.conf
server {
    listen 80;
    server_name www.lk-it.cn lk-it.cn;

    # Next.js前端
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Strapi Admin
    location /admin {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Strapi API
    location /api {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 50M;
    }

    # Static cache
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

### 8.8 SSL证书配置

```bash
# 方式1: 使用Let's Encrypt免费SSL
yum install -y certbot python3-certbot-nginx
certbot --nginx -d www.lk-it.cn -d lk-it.cn

# 方式2: 华为云SSL证书
# 在华为云控制台申请免费DV证书 → 下载Nginx格式 → 上传至ECS
```

### 8.9 启动生产服务

```bash
# 构建并启动CMS
cd /var/www/lk-website/cms
npm run build
pm2 start npm --name "lk-cms" -- run start

# 构建并启动前端
cd /var/www/lk-website/frontend
npm run build
pm2 start node_modules/.bin/next --name "lk-frontend" -- start

# 保存PM2进程
pm2 save
pm2 startup

# 验证
curl http://localhost:3000
curl http://localhost:1337/api
```

### 8.10 最终验证清单

- [ ] https://www.lk-it.cn 正常访问
- [ ] /zh-CN 和 /en 双语切换正常
- [ ] 所有页面内容正确显示
- [ ] Strapi后台 https://www.lk-it.cn/admin 可访问
- [ ] 表单提交功能正常
- [ ] PDF下载功能正常
- [ ] 图片正常加载(来自OSS)
- [ ] sitemap.xml 和 robots.txt 可访问
- [ ] SSL证书有效(Https)
- [ ] 手机端响应式正常

---

## 九、项目开发落地排期

| 阶段 | 天数 | 内容 | 产出 |
|------|------|------|------|
| Phase 0 | Day 1-2 | 项目初始化、依赖安装、主题配置 | 可运行的空项目 |
| Phase 1 | Day 3-5 | Header/Footer/MobileNav/布局组件 | 全局导航框架 |
| Phase 2 | Day 6-9 | 首页所有板块 (Hero→CTA) | 完整首页 |
| Phase 3 | Day 7-10 | Strapi CMS数据模型+内容录入 | CMS后台+种子数据 |
| Phase 4 | Day 10-12 | 关于我们页面 | Who We Are页面 |
| Phase 5 | Day 13-18 | 产品/方案/案例/新闻/招聘/联系页面 | 6个子页面 |
| Phase 6 | Day 19-21 | 4个表单+API路由 | 表单系统 |
| Phase 7 | Day 22-25 | CMS动态渲染接入+ISR | 前后端打通 |
| Phase 8 | Day 26-28 | SEO配置(sitemap/robots/meta/JSON-LD) | SEO检测通过 |
| Phase 9 | Day 29-33 | i18n完善、动画优化、响应式QA | 所有设备适配 |
| Phase 10 | Day 34-35 | 本地生产部署+文档 | 可访问的内网站点 |

**模块拆分说明**:
- 前端源码: `/frontend/src/` 包含全部前端代码
- CMS后端: `/cms/` 包含Strapi CMS
- 中英文翻译: `/frontend/messages/`
- 表单API: `/frontend/src/app/api/`
- SEO配置: `/frontend/src/app/sitemap.ts`, `robots.ts`
- 品牌组件: `/frontend/src/components/ui/` (可复用UI组件)

---

## 十、Strapi CMS数据模型设计

### 10.1 集合类型 (Collection Types)

#### Product (产品)
| 字段 | 类型 | 说明 |
|------|------|------|
| title | Text (i18n) | 产品名称 |
| slug | UID | URL标识 |
| description | Rich Text (i18n) | 产品描述 |
| icon | Media | 产品图标 |
| coverImage | Media | 封面图 |
| category | Enum | data_products/enterprise_apps/talent_services |
| features | JSON (i18n) | 功能特性数组 |
| order | Number | 排序 |
| isFeatured | Boolean | 首页展示 |
| seo | Component (SEO) | SEO元数据 |

#### Case (案例)
| 字段 | 类型 | 说明 |
|------|------|------|
| title | Text (i18n) | 案例标题 |
| slug | UID | URL标识 |
| clientName | Text (i18n) | 客户名称 |
| industry | Enum | 所属行业 |
| thumbnail | Media | 缩略图 |
| gallery | Media (multiple) | 案例截图 |
| summary | Textarea (i18n) | 案例摘要 |
| challenge/solution/results | Textarea (i18n) | 挑战/方案/成果 |
| technologies | JSON | 技术标签 |
| clientLogo | Media | 客户Logo |
| isFeatured | Boolean | 首页展示 |

#### Article (新闻)
| 字段 | 类型 | 说明 |
|------|------|------|
| title | Text (i18n) | 文章标题 |
| slug | UID | URL标识 |
| category | Enum | company_news/tech_article/industry_insight |
| excerpt | Textarea (i18n) | 文章摘要 |
| content | Rich Text (i18n) | 文章内容 |
| author | Text | 作者 |
| publishDate | Date | 发布日期 |
| tags | JSON | 标签数组 |

#### Job (职位)
| 字段 | 类型 | 说明 |
|------|------|------|
| title | Text (i18n) | 职位名称 |
| department | Text (i18n) | 部门 |
| location | Text (i18n) | 工作地点 |
| type | Enum | full_time/part_time/internship/contract |
| description | Rich Text (i18n) | 职位描述 |
| requirements | Rich Text (i18n) | 任职要求 |
| salaryRange | Text (i18n) | 薪资范围 |
| isActive | Boolean | 是否在招 |

### 10.2 单一类型 (Single Types)

- **HomePage**: Hero内容、Stats数据、精选产品/案例/文章
- **AboutPage**: 企业简介、使命愿景、价值观、里程碑、团队
- **GlobalSetting**: Logo、联系方式、ICP备案、版权信息

### 10.3 表单提交集合

- **ContactSubmission**: name, email, company, phone, message, submitted_at
- **ResumeSubmission**: name, email, phone, position, resume_file, cover_letter, submitted_at
- **DemoRequest**: name, email, phone, company, product_interest, preferred_date, message, submitted_at
- **PdfDownloadRecord**: name, email, company, pdf_title, downloaded_at

### 10.4 共享组件 (Components)

#### SEO组件
| 字段 | 类型 | 说明 |
|------|------|------|
| metaTitle | Text (i18n) | 页面标题 |
| metaDescription | Textarea (i18n) | 页面描述 |
| ogImage | Media | Open Graph图片 |
| canonicalUrl | Text | 规范URL |
| noindex | Boolean | 禁止索引 |

---

## 接口预留说明

以下接口已预留点位，代码中包含TODO注释标记:

1. **企业微信集成**: `/api/contact` 路由中预留企业微信Webhook通知
2. **客服系统**: Footer组件中预留在线客服入口
3. **招聘平台**: `/api/resume` 路由中预留招聘平台同步接口
4. **百度地图**: Contact页面中预留百度地图API加载区域
5. **数据统计**: 所有表单提交接口预留数据分析埋点

---

## 注意事项

1. **素材路径**: 所有图片引用使用 `/public/images/` 下的本地相对路径，部署前将8个项目截图、5个证书扫描件、8个客户LOGO放入对应文件夹
2. **品牌LOGO**: 将资料中的LKtechnology黑白LOGO源文件放入 `/public/images/logo/`
3. **联系方式**: 电话/地址/邮箱为占位符，部署前更新为实际信息
4. **ICP备案号**: Footer中的ICP备案号更新为实际备案号
5. **Node.js版本**: Strapi CMS要求Node.js v20 LTS (better-sqlite3编译兼容)
6. **环境变量**: 生产环境务必修改所有JWT_SECRET和API密钥
