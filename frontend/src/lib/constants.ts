// LKtechnology Website - Global Constants

export const SITE_CONFIG = {
  name: '广西箩筐信息科技有限公司',
  nameEn: 'LKtechnology',
  fullNameEn: 'GUANGXI LUOKUANG INFORMATION TECHNOLOGY CORPORATION',
  domain: 'www.lk-it.cn',
  founded: 2020,
  teamSize: 70,
  rdRatio: 90,
};

export const BRAND_COLORS = {
  primary: '#1947b3',
  primaryLight: '#3d6fd9',
  primaryDark: '#12378f',
  accent: '#36a2d0',
  accentLight: '#e8f4f9',
  footerBg: '#0f172a',
};

export const NAV_ITEMS = [
  { key: 'home', label: { zh: '首页', en: 'Home' }, href: { zh: '/zh-CN', en: '/en' } },
  { key: 'who-we-are', label: { zh: '关于我们', en: 'Who We Are' }, href: { zh: '/zh-CN/who-we-are', en: '/en/who-we-are' } },
  { key: 'products-services', label: { zh: '产品与服务', en: 'Products & Services' }, href: { zh: '/zh-CN/products-services', en: '/en/products-services' } },
  { key: 'industry-solutions', label: { zh: '行业解决方案', en: 'Industry Solutions' }, href: { zh: '/zh-CN/industry-solutions', en: '/en/industry-solutions' } },
  { key: 'cases', label: { zh: '成功案例', en: 'Cases' }, href: { zh: '/zh-CN/cases', en: '/en/cases' } },
  { key: 'news', label: { zh: '新闻动态', en: 'News' }, href: { zh: '/zh-CN/news', en: '/en/news' } },
  { key: 'careers', label: { zh: '人才招聘', en: 'Careers' }, href: { zh: '/zh-CN/careers', en: '/en/careers' } },
  { key: 'contact', label: { zh: '联系我们', en: 'Contact Us' }, href: { zh: '/zh-CN/contact', en: '/en/contact' } },
];

export const INDUSTRIES = [
  { key: 'metallurgy', label: { zh: '冶金制造', en: 'Metallurgy Mfg' }, icon: 'Factory' },
  { key: 'automotive', label: { zh: '汽车工业', en: 'Automotive Industry' }, icon: 'Car' },
  { key: 'agriculture', label: { zh: '畜牧农业', en: 'Agriculture' }, icon: 'Leaf' },
  { key: 'logistics', label: { zh: '运输物流', en: 'Transport Logistics' }, icon: 'Truck' },
  { key: 'energy', label: { zh: '能源环保', en: 'Energy & Environment' }, icon: 'Zap' },
  { key: 'manufacturing', label: { zh: '智能制造', en: 'Intelligent Mfg' }, icon: 'Cog' },
];

export const PRODUCT_CATEGORIES = [
  { key: 'data_products', label: { zh: '数据产品实施覆盖', en: 'Data Product Implementation' } },
  { key: 'enterprise_apps', label: { zh: '定制化开发服务', en: 'Custom Development Services' } },
  { key: 'talent_services', label: { zh: '信息化人才赋能', en: 'IT Talent Empowerment' } },
];

export const ARTICLE_CATEGORIES = [
  { key: 'company_news', label: { zh: '企业资讯', en: 'Company News' } },
  { key: 'tech_article', label: { zh: '技术干货', en: 'Tech Articles' } },
  { key: 'industry_insight', label: { zh: '行业洞察', en: 'Industry Insights' } },
];

export const SEO_KEYWORDS_ZH = [
  '广西数据治理', '工业互联网平台', '数据中台建设', '制造业MES',
  '冶金数字化', '汽车工业数字化', 'IT驻场外包', 'ERP系统开发',
  'CRM客户管理', 'SCM供应链', 'WMS仓储管理', 'EMS能源管理',
  '轧辊管理系统', 'BI可视化', '数据大屏', 'DAMA中国认证',
  '广西箩筐信息科技', 'LKtechnology',
];

export const SEO_KEYWORDS_EN = [
  'Guangxi data governance', 'industrial internet platform', 'manufacturing digital transformation',
  'data middle platform', 'metallurgy digitalization', 'automotive industry digital',
  'IT talent services', 'ERP development', 'MES manufacturing execution',
  'data governance China', 'DAMA certified', 'LKtechnology',
];

export const META_TEMPLATE = {
  zh: {
    titleTemplate: '%s | LKtechnology广西箩筐信息科技-数据治理与工业互联网服务商',
    defaultTitle: 'LKtechnology广西箩筐信息科技-数据治理与工业互联网服务商',
    defaultDescription: '广西箩筐信息科技有限公司(LKtechnology)专注数据治理与工业互联网，DAMA中国认证团队，提供数据产品实施覆盖、定制化开发服务、信息化人才赋能。服务柳钢集团、柳工集团、上汽通用五菱等行业龙头。',
    defaultKeywords: SEO_KEYWORDS_ZH.join(', '),
  },
  en: {
    titleTemplate: '%s | LKtechnology - Data Governance & Industrial Internet Provider',
    defaultTitle: 'LKtechnology - Data Governance & Industrial Internet Provider',
    defaultDescription: 'GUANGXI LUOKUANG INFORMATION TECHNOLOGY CORPORATION (LKtechnology) specializes in data governance and industrial internet. DAMA China certified team providing data product implementation, custom development, and IT talent empowerment.',
    defaultKeywords: SEO_KEYWORDS_EN.join(', '),
  },
};
