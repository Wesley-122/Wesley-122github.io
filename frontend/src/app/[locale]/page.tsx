import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import FeatureGrid from "@/components/sections/FeatureGrid";
import LogoWall from "@/components/sections/LogoWall";
import CaseCard from "@/components/sections/CaseCard";
import NewsCard from "@/components/sections/NewsCard";
import CTABanner from "@/components/sections/CTABanner";
import { Database, Code2, Users } from "lucide-react";
import type { Locale } from "@/types/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "HomePage" });

  const isZh = locale === "zh-CN";

  // Static data based on company materials - will be replaced by Strapi CMS fetch
  const featureItems = [
    {
      icon: <Database className="h-7 w-7" />,
      title: isZh ? "数据产品实施覆盖" : "Data Product Implementation",
      description: isZh
        ? "依托资深数据治理团队，提供数据盘点、标准制定至平台落地的全周期服务。助力企业盘活数据资产，夯实数据底座，全面驱动科学决策。"
        : "Full-cycle data services from data inventory and standards to platform deployment. Empowers enterprises to activate data assets and drive scientific decision-making.",
      href: `/${locale}/products-services`,
    },
    {
      icon: <Code2 className="h-7 w-7" />,
      title: isZh ? "定制化开发服务" : "Custom Development Services",
      description: isZh
        ? "聚焦企业核心业务场景，提供需求分析、架构设计至开发上线的全流程定制。采用敏捷模式，确保系统高效交付、灵活扩展，精准匹配创新需求。"
        : "Full-process customization from requirements analysis and architecture design to development and launch. Agile delivery ensures flexible, scalable solutions.",
      href: `/${locale}/products-services`,
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: isZh ? "信息化人才赋能" : "IT Talent Empowerment",
      description: isZh
        ? "依托专业人才资源池，提供软件开发、项目实施与运维保障等全岗位支持。按需灵活调配，降低企业用工成本，保障项目高效推进与技术经验沉淀。"
        : "Professional talent pool providing software development, project implementation, and operations support. Flexible deployment reduces costs and ensures project success.",
      href: `/${locale}/products-services`,
    },
  ];

  // Client logos - from PDF brochure page 1 logo wall
  const clientLogos = [
    { name: "柳钢集团", logoUrl: "/images/clients/cngr-logo.png" },
    { name: "柳工集团", logoUrl: "/images/clients/liugong-logo.png" },
    { name: "上汽通用五菱", logoUrl: "/images/clients/sgmw-logo.png" },
    { name: "东风柳汽", logoUrl: "/images/clients/dflq-logo.png" },
    { name: "唐人神集团", logoUrl: "/images/clients/trs-logo.png" },
    { name: "百圣食品", logoUrl: "/images/clients/baisheng-logo.png" },
    { name: "OK出行", logoUrl: "/images/clients/ok-logo.png" },
  ];

  // Featured cases - from the 8 benchmark projects
  const featuredCases = [
    {
      slug: "liugang-logistics-data-platform",
      title: isZh ? "柳钢物流一体化数据中台" : "Liugang Logistics Data Middle Platform",
      clientName: isZh ? "柳钢集团" : "Liugang Group",
      industry: isZh ? "冶金制造" : "Metallurgy Mfg",
      summary: isZh
        ? "构建涵盖合同、价格、运力、仓储、港口等中心板块，打通各基地物流数据壁垒，实现物流过程透明化、数据共享与互联互通，汽运与联运成本有效降低。"
        : "Built logistics data platform covering contracts, pricing, capacity, warehousing, and ports. Enabled transparent logistics, data sharing, and significant cost reduction.",
      technologies: ["数据中台", "ETL", "BI", "iPaaS"],
      thumbnailUrl: "/images/cases/steel-plant.png",
    },
    {
      slug: "baojun-process-management",
      title: isZh ? "宝骏工艺文件管理系统" : "Baojun Process Document Mgmt",
      clientName: isZh ? "上汽通用五菱" : "SGMW",
      industry: isZh ? "汽车工业" : "Automotive Industry",
      summary: isZh
        ? "聚焦总装车间工艺数据全生命周期管理，建立统一文控体系与版本管理机制，实现工艺文件线上审批、安全共享与快速下发，文件流转效率大幅提升。"
        : "Focused on assembly workshop process data lifecycle management. Established unified document control with version management, online approval, and secure sharing.",
      technologies: ["MES", "文档管理", "Vue.js"],
      thumbnailUrl: "/images/cases/auto-assembly.png",
    },
    {
      slug: "saike-energy-management",
      title: isZh ? "赛克瑞浦能源管理系统" : "Saikeruipu Energy Management",
      clientName: isZh ? "赛克瑞浦" : "Saikeruipu",
      industry: isZh ? "能源环保" : "Energy & Environment",
      summary: isZh
        ? "为20GWh动力电池项目打造统一能源管理系统，覆盖水电气热全介质监测与优化调度，实现「降本、提效、增绿」目标，保障大规模制造运营可持续性。"
        : "Built unified energy management system for 20GWh battery project. Covers all media monitoring with optimized scheduling for cost, efficiency, and sustainability goals.",
      technologies: ["IoT", "能源管理", "大屏", "碳监测"],
      thumbnailUrl: "/images/cases/battery-energy.png",
    },
  ];

  const featuredNews = [
    {
      slug: "lk-technology-high-tech-certification",
      title: isZh ? "箩筐科技荣获国家高新技术企业认定" : "LKtechnology Certified as National High-Tech Enterprise",
      excerpt: isZh
        ? "广西箩筐信息科技有限公司正式通过国家高新技术企业认定，标志着公司在技术创新与研发能力方面获得国家级认可。"
        : "LKtechnology officially certified as a National High-Tech Enterprise, marking national recognition of our technical innovation capabilities.",
      category: isZh ? "企业资讯" : "Company News",
      publishDate: "2025-06-15",
    },
    {
      slug: "lk-technology-huawei-cloud-partner",
      title: isZh ? "箩筐科技成为华为云精英服务商" : "LKtechnology Becomes Huawei Cloud Elite Service Partner",
      excerpt: isZh
        ? "箩筐科技与华为云达成战略合作，正式成为华为云精英服务商，为客户提供更全面的云+数据解决方案。"
        : "LKtechnology partners with Huawei Cloud as an Elite Service Provider, offering comprehensive cloud + data solutions.",
      category: isZh ? "企业资讯" : "Company News",
      publishDate: "2025-03-20",
    },
    {
      slug: "data-governance-best-practices",
      title: isZh ? "制造业数据治理的三大关键挑战与应对策略" : "Three Key Challenges in Manufacturing Data Governance",
      excerpt: isZh
        ? "本文深入分析制造企业在数据治理过程中面临的数据孤岛、标准不统一、人才短缺等核心挑战及应对方案。"
        : "An in-depth analysis of core challenges in manufacturing data governance: data silos, standards, and talent shortages.",
      category: isZh ? "技术干货" : "Tech Article",
      publishDate: "2025-02-10",
    },
  ];

  return (
    <>
      {/* SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: isZh ? "广西箩筐信息科技有限公司" : "GUANGXI LUOKUANG INFORMATION TECHNOLOGY CORPORATION",
            alternateName: "LKtechnology",
            url: `https://www.lk-it.cn/${locale}`,
            description: isZh
              ? "专注数据治理与工业互联网，技术驱动企业数字化转型"
              : "Driving manufacturing digital transformation through data governance and industrial internet.",
            foundingDate: "2020-09",
            numberOfEmployees: "70",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nanning",
              addressRegion: "Guangxi",
              addressCountry: "CN",
            },
          }),
        }}
      />

      {/* 1. Hero Section */}
      <HeroSection
        locale={locale as Locale}
        title={isZh ? "与您携手 · 共建未来" : "Joining Hands, Building the Future Together"}
        subtitle={isZh
          ? "专注数据治理与工业互联网，技术驱动企业数字化转型"
          : "Driving enterprise digital transformation through data governance and industrial internet"}
        ctaPrimary={isZh ? "预约演示" : "Schedule Demo"}
        ctaSecondary={isZh ? "了解我们的产品" : "Our Products"}
      />

      {/* 2. Core Business Features */}
      <SectionWrapper>
        <FeatureGrid
          locale={locale as Locale}
          title={isZh ? "核心业务" : "Core Business"}
          subtitle={isZh
            ? "三大业务板块，为企业提供全方位的数字化转型解决方案"
            : "Three business pillars providing comprehensive digital transformation solutions"}
          features={featureItems}
        />
      </SectionWrapper>

      {/* 3. Client Logo Wall */}
      <SectionWrapper alt>
        <LogoWall
          locale={locale as Locale}
          title={isZh ? "合作伙伴" : "Our Partners"}
          logos={clientLogos}
        />
      </SectionWrapper>

      {/* 4. Featured Cases */}
      <SectionWrapper>
        <SectionHeading
          title={isZh ? "标杆案例" : "Benchmark Cases"}
          subtitle={isZh ? "覆盖冶金制造、汽车工业、能源环保等行业的标杆项目" : "Benchmark projects across metallurgy, automotive, energy and more"}
        />
        <div className="grid gap-8 md:grid-cols-3">
          {featuredCases.map((caseItem, idx) => (
            <CaseCard
              key={caseItem.slug}
              locale={locale as Locale}
              {...caseItem}
              delayIndex={idx}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={`/${locale}/cases`} className="btn-outline">
            {isZh ? "查看全部案例" : "View All Cases"} →
          </a>
        </div>
      </SectionWrapper>

      {/* 5. Latest News */}
      <SectionWrapper alt>
        <SectionHeading
          title={isZh ? "新闻动态" : "News & Insights"}
          subtitle={isZh ? "企业资讯与技术干货" : "Company updates and technical articles"}
        />
        <div className="grid gap-8 md:grid-cols-3">
          {featuredNews.map((news, idx) => (
            <NewsCard
              key={news.slug}
              locale={locale as Locale}
              {...news}
              delayIndex={idx}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={`/${locale}/news`} className="btn-outline">
            {isZh ? "查看全部新闻" : "View All News"} →
          </a>
        </div>
      </SectionWrapper>

      {/* 6. CTA Banner */}
      <SectionWrapper>
        <CTABanner
          locale={locale as Locale}
          title={isZh ? "开启您的数字化转型之旅" : "Start Your Digital Transformation Journey"}
          subtitle={isZh
            ? "立即联系我们，获取专属解决方案与演示"
            : "Contact us now for a customized solution and demo"}
        />
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  return {
    title: isZh ? "LKtechnology广西箩筐信息科技-数据治理与工业互联网服务商" : "LKtechnology - Data Governance & Industrial Internet Provider",
    description: isZh
      ? "广西箩筐信息科技有限公司(LKtechnology)专注数据治理与工业互联网，提供数据产品实施覆盖、定制化开发服务、信息化人才赋能三大核心业务，DAMA中国认证团队。"
      : "GUANGXI LUOKUANG INFORMATION TECHNOLOGY CORPORATION (LKtechnology) specializes in data governance and industrial internet. DAMA China certified team with 70+ professionals.",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", "zh-CN": "/zh-CN" },
    },
  };
}
