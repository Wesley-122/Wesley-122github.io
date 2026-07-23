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
      title: isZh ? "全链路数据治理" : "Full-Chain Data Governance",
      description: isZh
        ? "数据中台、ETL、iPaaS、BI可视化、数据大屏、数据资产全生命周期管理，帮助企业建立完整的数据驱动能力。"
        : "Data middle platform, ETL, iPaaS, BI visualization, data dashboards, and full lifecycle data asset management.",
      href: `/${locale}/products-services`,
    },
    {
      icon: <Code2 className="h-7 w-7" />,
      title: isZh ? "制造业定制系统开发" : "Custom Manufacturing Systems",
      description: isZh
        ? "MES/ERP/CRM/SCM/WMS/EMS等制造执行与管理系统开发，轧辊管理、能源管理、养殖销售等垂直领域解决方案。"
        : "MES/ERP/CRM/SCM/WMS/EMS development, plus vertical solutions for roll management, energy management, and more.",
      href: `/${locale}/products-services`,
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: isZh ? "技术人力外包" : "IT Talent Outsourcing",
      description: isZh
        ? "驻场开发、项目实施、运维服务，70+精英团队，90%技术研发人员，DAMA中国认证实施团队保障交付质量。"
        : "On-site development, project implementation, and operations. 70+ professionals, 90% R&D, DAMA certified.",
      href: `/${locale}/products-services`,
    },
  ];

  // Client logos - all from company reference materials
  const clientLogos = [
    { name: "柳钢集团", logoUrl: "/images/clients/cngr-logo.svg" },
    { name: "上汽通用五菱", logoUrl: "/images/clients/sgmw-logo.svg" },
    { name: "柳工集团", logoUrl: "/images/clients/liugong-logo.svg" },
    { name: "唐人神", logoUrl: "/images/clients/trs-logo.svg" },
    { name: "赛克瑞浦", logoUrl: "/images/clients/skrep-logo.svg" },
    { name: "大丰禽业", logoUrl: "/images/clients/dafeng-logo.svg" },
    { name: "柳钢东信", logoUrl: "/images/clients/dongxin-logo.svg" },
    { name: "OK出行", logoUrl: "/images/clients/ok-logo.svg" },
  ];

  // Featured cases - from the 8 benchmark projects
  const featuredCases = [
    {
      slug: "liugang-logistics-data-platform",
      title: isZh ? "柳钢物流一体化数据中台" : "Liugang Logistics Data Middle Platform",
      clientName: isZh ? "柳钢集团" : "Liugang Group",
      industry: isZh ? "冶金" : "Metallurgy",
      summary: isZh
        ? "为柳钢集团构建物流一体化数据中台，打通采购、仓储、运输全链路数据，实现物流数据实时分析与智能调度。"
        : "Built an integrated logistics data middle platform for Liugang Group, enabling real-time analysis and intelligent scheduling.",
      technologies: ["数据中台", "ETL", "BI", "iPaaS"],
      thumbnailUrl: "/images/cases/steel-plant.svg",
    },
    {
      slug: "baojun-process-management",
      title: isZh ? "宝骏工艺文件管理系统" : "Baojun Process Document Management System",
      clientName: isZh ? "上汽通用五菱" : "SGMW",
      industry: isZh ? "汽车制造" : "Automotive",
      summary: isZh
        ? "为上汽通用五菱宝骏基地开发工艺文件管理系统，实现生产工艺文件的数字化管理与版本控制。"
        : "Developed a process document management system for SGMW Baojun, enabling digital management and version control.",
      technologies: ["MES", "文档管理", "Vue.js"],
      thumbnailUrl: "/images/cases/auto-assembly.svg",
    },
    {
      slug: "liugang-roll-management",
      title: isZh ? "柳钢中金轧辊全生命周期管理系统" : "Liugang Roll Lifecycle Management System",
      clientName: isZh ? "柳钢中金" : "Liugang Zhongjin",
      industry: isZh ? "冶金" : "Metallurgy",
      summary: isZh
        ? "开发轧辊全生命周期管理系统，覆盖轧辊采购、使用、研磨、报废全过程，降低轧辊消耗成本。"
        : "Roll lifecycle management covering procurement, usage, grinding, and retirement to reduce roll consumption costs.",
      technologies: ["Java", "Spring Boot", "物联网", "MySQL"],
      thumbnailUrl: "/images/cases/steel-rolling.svg",
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
            name: isZh ? "广西箩筐信息科技有限公司" : "Guangxi Luokuang Information Technology Co., Ltd.",
            alternateName: "LKtechnology",
            url: `https://www.lk-it.cn/${locale}`,
            description: isZh
              ? "专注数据治理与工业互联网，技术驱动制造企业数字化转型"
              : "Driving manufacturing digital transformation through data governance and industrial internet.",
            foundingDate: "2020",
            numberOfEmployees: "70",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Liuzhou",
              addressRegion: "Guangxi",
              addressCountry: "CN",
            },
          }),
        }}
      />

      {/* 1. Hero Section */}
      <HeroSection
        locale={locale as Locale}
        title={isZh ? "以数据驱动制造，以技术重塑工业" : "Drive Manufacturing with Data, Reshape Industry with Technology"}
        subtitle={isZh
          ? "专注数据治理与工业互联网，为制造企业提供全链路数字化解决方案"
          : "Full-chain digital solutions for manufacturing enterprises through data governance and industrial internet"}
        ctaPrimary={isZh ? "预约演示" : "Schedule Demo"}
        ctaSecondary={isZh ? "了解我们的产品" : "Our Products"}
      />

      {/* 2. Core Business Features */}
      <SectionWrapper>
        <FeatureGrid
          locale={locale as Locale}
          title={isZh ? "核心业务" : "Core Business"}
          subtitle={isZh
            ? "三大业务板块，覆盖制造企业全链路数字化需求"
            : "Three business pillars covering the full-chain digital needs of manufacturing enterprises"}
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
          subtitle={isZh ? "8大行业标杆项目，见证数字化转型实战成果" : "8 benchmark projects showcasing digital transformation results"}
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
    title: isZh ? "LKtechnology箩筐信息科技-广西工业互联网与数据治理服务商" : "LKtechnology - Industrial Internet & Data Governance Provider",
    description: isZh
      ? "广西箩筐信息科技有限公司(LKtechnology)专注数据治理与工业互联网，提供数据中台、MES/ERP/CRM/SCM/WMS系统开发、技术人力外包服务。"
      : "LKtechnology specializes in data governance and industrial internet. We provide data middle platform, MES/ERP/CRM/SCM/WMS development and IT outsourcing.",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", "zh-CN": "/zh-CN" },
    },
  };
}
