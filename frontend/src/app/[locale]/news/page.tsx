import SectionWrapper from "@/components/shared/SectionWrapper";
import PageBanner from "@/components/shared/PageBanner";
import NewsCard from "@/components/sections/NewsCard";
import FloatingTOC from "@/components/shared/FloatingTOC";

type Props = { params: Promise<{ locale: string }> };

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  const articles = [
    {
      slug: "lk-digital-ops-platform",
      title: isZh
        ? "箩筐科技与柳钢深化合作，数字化运维平台全面上线"
        : "LKtechnology & Liugang Deepen Cooperation, Digital Ops Platform Goes Live",
      excerpt: isZh
        ? "为柳钢集团打造的数字化运维管理平台正式上线运行，覆盖设备巡检、故障预警、工单调度全流程，运维效率提升40%以上。"
        : "Digital operations platform for Liugang Group officially launched, covering equipment inspection, fault warning, and work order dispatch, improving efficiency by 40%+.",
      category: isZh ? "企业资讯" : "Company News",
      publishDate: "2025-07-15",
    },
    {
      slug: "lk-hightech-cert",
      title: isZh
        ? "箩筐科技荣获国家高新技术企业认定"
        : "LKtechnology Certified as National High-Tech Enterprise",
      excerpt: isZh
        ? "正式通过国家高新技术企业认定，标志着公司在技术创新与研发能力方面获得国家级认可。"
        : "Officially certified as a National High-Tech Enterprise, marking national recognition of our technical innovation and R&D capabilities.",
      category: isZh ? "企业资讯" : "Company News",
      publishDate: "2025-06-15",
    },
    {
      slug: "ai-industrial-inspection",
      title: isZh
        ? "AI大模型在工业质检中的应用探索与实践"
        : "AI Large Models in Industrial Quality Inspection: Exploration & Practice",
      excerpt: isZh
        ? "探讨大语言模型与计算机视觉技术在制造业质检场景中的融合应用，分析落地挑战与解决方案。"
        : "Exploring the integration of LLMs and computer vision in manufacturing quality inspection with practical case studies.",
      category: isZh ? "技术干货" : "Tech Article",
      publishDate: "2025-05-22",
    },
    {
      slug: "lk-huawei-partner",
      title: isZh
        ? "箩筐科技成为华为云精英服务商"
        : "LKtechnology Becomes Huawei Cloud Elite Partner",
      excerpt: isZh
        ? "与华为云达成战略合作，正式成为华为云精英服务商，为客户提供全面的云+数据解决方案。"
        : "Strategic partnership with Huawei Cloud as Elite Service Provider, offering comprehensive cloud + data solutions.",
      category: isZh ? "企业资讯" : "Company News",
      publishDate: "2025-03-20",
    },
    {
      slug: "data-middle-platform-guide",
      title: isZh
        ? "从数据孤岛到数据驱动：制造业数据中台建设实战指南"
        : "From Data Silos to Data-Driven: A Practical Guide to Manufacturing Data Middle Platform",
      excerpt: isZh
        ? "详解制造业数据中台从规划到落地的全流程方法论，涵盖数据入湖、治理、服务化关键环节。"
        : "A step-by-step methodology for building data middle platforms in manufacturing, covering data ingestion, governance, and service-oriented architecture.",
      category: isZh ? "技术干货" : "Tech Article",
      publishDate: "2025-03-08",
    },
    {
      slug: "data-gov-challenges",
      title: isZh
        ? "制造业数据治理的三大关键挑战与应对策略"
        : "Three Key Challenges in Manufacturing Data Governance",
      excerpt: isZh
        ? "深入分析制造企业在数据治理中面临的数据孤岛、标准不统一、人才短缺等核心挑战，并结合箩筐科技实战经验提出应对方案。"
        : "Deep analysis of core challenges: data silos, inconsistent standards, and talent shortage in manufacturing data governance with LKtechnology's solutions.",
      category: isZh ? "技术干货" : "Tech Article",
      publishDate: "2025-02-10",
    },
    {
      slug: "mes-best-practices",
      title: isZh
        ? "MES系统选型与实施指南：制造企业必读"
        : "MES Selection & Implementation Guide for Manufacturers",
      excerpt: isZh
        ? "从需求分析到系统上线，详解MES系统选型关键要素与实施最佳实践，帮助制造企业少走弯路。"
        : "From requirements analysis to go-live, key factors in MES selection and implementation best practices to help manufacturers avoid common pitfalls.",
      category: isZh ? "技术干货" : "Tech Article",
      publishDate: "2025-01-18",
    },
    {
      slug: "industry-internet-trends",
      title: isZh
        ? "2025工业互联网发展趋势与展望"
        : "2025 Industrial Internet Trends & Outlook",
      excerpt: isZh
        ? "分析2025年工业互联网平台、边缘计算、AI质检、数字孪生等关键技术发展方向与产业落地趋势。"
        : "Analysis of 2025 industrial internet trends: IIoT platforms, edge computing, AI quality inspection, digital twins, and their industrial adoption.",
      category: isZh ? "行业洞察" : "Industry Insight",
      publishDate: "2025-01-05",
    },
    {
      slug: "lk-team-expansion",
      title: isZh
        ? "箩筐科技团队突破70人，加速全国业务布局"
        : "LKtechnology Team Surpasses 70, Accelerating National Expansion",
      excerpt: isZh
        ? "团队规模突破70人，技术研发人员占比超90%，持续引进高端数字化人才，拓展华南、西南区域市场。"
        : "Team surpasses 70 with over 90% R&D engineers, continuing to attract top digital talent and expand across South and Southwest China.",
      category: isZh ? "企业资讯" : "Company News",
      publishDate: "2024-12-01",
    },
  ];

  // 提取目录数据
  const tocItems = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
  }));

  return (
    <>
      <PageBanner
        title={isZh ? "新闻动态" : "News & Insights"}
        subtitle={
          isZh
            ? "企业资讯、技术干货与行业洞察"
            : "Company news, technical articles & industry insights"
        }
      />

      <SectionWrapper className="relative z-10 !pt-6 md:!pt-8 !pb-24 md:!pb-32">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, idx) => (
            <NewsCard
              key={a.slug}
              locale={locale as "zh-CN" | "en"}
              delayIndex={idx}
              {...a}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* 悬浮目录按钮 — 客户端组件 */}
      <FloatingTOC
        items={tocItems}
        label={isZh ? "新闻目录" : "News Contents"}
      />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";
  return {
    title: isZh ? "新闻动态" : "News & Insights",
    description: isZh
      ? "箩筐科技最新企业资讯、工业数字化技术干货、行业洞察。涵盖数据治理、MES、工业互联网、AI质检等热门话题。"
      : "Latest news, technical articles and industry insights from LKtechnology. Covering data governance, MES, industrial IoT, AI inspection and more.",
    alternates: {
      canonical: `/${locale}/news`,
      languages: { en: "/en/news", "zh-CN": "/zh-CN/news" },
    },
  };
}
