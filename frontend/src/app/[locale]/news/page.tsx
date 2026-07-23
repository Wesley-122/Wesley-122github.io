import SectionWrapper from "@/components/shared/SectionWrapper";
import PageBanner from "@/components/shared/PageBanner";
import NewsCard from "@/components/sections/NewsCard";

type Props = { params: Promise<{ locale: string }> };

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  const articles = [
    { slug: "lk-hightech-cert", title: isZh ? "箩筐科技荣获国家高新技术企业认定" : "LKtechnology Certified as National High-Tech Enterprise", excerpt: isZh ? "正式通过国家高新技术企业认定，标志着公司在技术创新与研发能力方面获得国家级认可。" : "Officially certified as a National High-Tech Enterprise, marking national recognition.", category: isZh ? "企业资讯" : "Company News", publishDate: "2025-06-15" },
    { slug: "lk-huawei-partner", title: isZh ? "箩筐科技成为华为云精英服务商" : "LKtechnology Becomes Huawei Cloud Elite Partner", excerpt: isZh ? "与华为云达成战略合作，正式成为华为云精英服务商，为客户提供全面的云+数据解决方案。" : "Strategic partnership with Huawei Cloud as Elite Service Provider.", category: isZh ? "企业资讯" : "Company News", publishDate: "2025-03-20" },
    { slug: "data-gov-challenges", title: isZh ? "制造业数据治理的三大关键挑战与应对策略" : "Three Key Challenges in Manufacturing Data Governance", excerpt: isZh ? "深入分析制造企业在数据治理中面临的数据孤岛、标准不统一、人才短缺等核心挑战。" : "Analysis of core challenges: data silos, standards, and talent shortage in manufacturing.", category: isZh ? "技术干货" : "Tech Article", publishDate: "2025-02-10" },
    { slug: "mes-best-practices", title: isZh ? "MES系统选型与实施指南：制造企业必读" : "MES Selection & Implementation Guide for Manufacturers", excerpt: isZh ? "从需求分析到系统上线，详解MES系统选型关键要素与实施最佳实践。" : "Key factors in MES selection and implementation best practices.", category: isZh ? "技术干货" : "Tech Article", publishDate: "2025-01-18" },
    { slug: "industry-internet-trends", title: isZh ? "2025工业互联网发展趋势与展望" : "2025 Industrial Internet Trends & Outlook", excerpt: isZh ? "分析2025年工业互联网平台、边缘计算、AI质检等关键技术发展方向。" : "Analysis of 2025 industrial internet trends: IIoT platforms, edge computing, AI quality inspection.", category: isZh ? "行业洞察" : "Industry Insight", publishDate: "2025-01-05" },
    { slug: "lk-team-expansion", title: isZh ? "箩筐科技团队突破70人，加速全国业务布局" : "LKtechnology Team Surpasses 70, Accelerating National Expansion", excerpt: isZh ? "团队规模突破70人，90%为技术研发人员，持续引进高端数字化人才。" : "Team surpasses 70 with 90% R&D engineers, continuing to attract top digital talent.", category: isZh ? "企业资讯" : "Company News", publishDate: "2024-12-01" },
  ];

  return (
    <>
      <PageBanner
        title={isZh ? "新闻动态" : "News & Insights"}
        subtitle={isZh ? "企业资讯、技术干货与行业洞察" : "Company news, technical articles & industry insights"}
      />
      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <NewsCard key={a.slug} locale={locale as "zh-CN" | "en"} {...a} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: (await params).locale === "zh-CN" ? "新闻动态" : "News",
    description: (await params).locale === "zh-CN" ? "箩筐科技最新企业资讯、工业数字化技术干货、行业洞察。" : "Latest news, technical articles and industry insights from LKtechnology.",
    alternates: { canonical: `/${locale}/news`, languages: { en: "/en/news", "zh-CN": "/zh-CN/news" } },
  };
}
