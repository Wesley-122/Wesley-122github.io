import { getTranslations } from "next-intl/server";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import PageBanner from "@/components/shared/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import Timeline from "@/components/sections/Timeline";
import FadeInView from "@/components/shared/FadeInView";
import { Award, Shield, Users, Lightbulb, Target, Eye } from "lucide-react";
import type { Locale } from "@/types/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function WhoWeArePage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  const values = [
    { icon: <Lightbulb className="h-6 w-6" />, title: isZh ? "技术驱动" : "Tech-Driven", desc: isZh ? "持续投入技术研发，保持行业领先的技术竞争力" : "Continuous R&D investment for competitive technical advantage" },
    { icon: <Users className="h-6 w-6" />, title: isZh ? "客户至上" : "Client First", desc: isZh ? "深入理解客户业务场景，提供量身定制的解决方案" : "Deep understanding of client scenarios with tailored solutions" },
    { icon: <Target className="h-6 w-6" />, title: isZh ? "务实创新" : "Practical Innovation", desc: isZh ? "脚踏实地解决问题，以创新思维突破技术瓶颈" : "Solve real problems with innovative breakthroughs" },
  ];

  const milestones = [
    { year: "2020", title: isZh ? "公司成立" : "Founded", description: isZh ? "广西箩筐信息科技有限公司在柳州正式成立，定位数据治理与工业互联网方向。" : "LKtechnology founded in Liuzhou, focusing on data governance and industrial internet." },
    { year: "2021", title: isZh ? "DAMA认证" : "DAMA Certified", description: isZh ? "团队获得DAMA中国数据治理认证，成为广西首家DAMA认证实施团队。" : "Team earned DAMA China data governance certification, the first in Guangxi." },
    { year: "2022", title: isZh ? "华为云精英服务商" : "Huawei Cloud Partner", description: isZh ? "正式成为华为云精英服务商，拓展云服务业务版图。" : "Became Huawei Cloud Elite Service Partner, expanding cloud service capabilities." },
    { year: "2023", title: isZh ? "高新技术企业" : "High-Tech Enterprise", description: isZh ? "荣获国家高新技术企业认定，团队规模突破50人。" : "Certified as National High-Tech Enterprise; team grew beyond 50." },
    { year: "2024", title: isZh ? "标杆项目落地" : "Benchmark Projects", description: isZh ? "柳钢物流数据中台、宝骏工艺系统等多个大型项目成功交付，团队突破70人。" : "Delivered multiple major projects; team grew to 70+." },
    { year: "2025", title: isZh ? "行业深耕" : "Industry Expansion", description: isZh ? "业务覆盖冶金、汽车、畜牧、物流、新能源五大行业，持续深耕制造业数字化转型。" : "Expanded to 5 industries, deepening manufacturing digital transformation." },
  ];

  const certifications = [
    { name: isZh ? "国家高新技术企业" : "National High-Tech Enterprise", body: isZh ? "科技部/财政部/税务总局" : "Ministry of Science & Technology", image: "/images/certifications/high-tech-cert.webp" },
    { name: isZh ? "华为云精英服务商" : "Huawei Cloud Elite Service Partner", body: isZh ? "华为云计算技术有限公司" : "Huawei Cloud", image: "/images/certifications/huawei-partner.webp" },
    { name: isZh ? "DAMA中国认证实施团队" : "DAMA China Certified Team", body: isZh ? "DAMA中国" : "DAMA China", image: "/images/certifications/dama-cert.webp" },
    { name: isZh ? "柳州市互联网协会会员" : "Liuzhou Internet Association Member", body: isZh ? "柳州市互联网协会" : "Liuzhou Internet Association", image: "/images/certifications/asso-cert.webp" },
    { name: isZh ? "软件著作权多项" : "Software Copyrights", body: isZh ? "国家版权局" : "National Copyright Administration", image: "/images/certifications/copyright-cert.webp" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: isZh ? "广西箩筐信息科技有限公司" : "Guangxi Luokuang Information Technology Co., Ltd.",
            alternateName: "LKtechnology",
            foundingDate: "2020",
            numberOfEmployees: "70",
            address: {
              "@type": "PostalAddress",
              addressLocality: isZh ? "柳州" : "Liuzhou",
              addressRegion: isZh ? "广西" : "Guangxi",
              addressCountry: "CN",
            },
          }),
        }}
      />

      {/* Page Header — 全站统一样式 */}
      <PageBanner
        title={isZh ? "关于我们" : "Who We Are"}
        subtitle={isZh
          ? "专注数据治理与工业互联网，技术驱动制造企业数字化转型"
          : "Driving manufacturing digital transformation through data governance and industrial internet"}
      />

      {/* 1. Company Intro */}
      <SectionWrapper>
        <SectionHeading title={isZh ? "企业简介" : "About Us"} />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-neutral-600">
            {isZh
              ? "广西箩筐信息科技有限公司（LKtechnology）成立于2020年，是一家专注数据治理与工业互联网的高新技术企业。公司总部位于广西柳州，拥有70余名精英员工，其中90%以上为技术研发人员。作为DAMA中国认证实施团队，我们致力于以技术驱动制造企业数字化转型。"
              : "Guangxi Luokuang Information Technology Co., Ltd. (LKtechnology), founded in 2020, is a high-tech enterprise focused on data governance and industrial internet. Headquartered in Liuzhou, Guangxi, we have 70+ professionals, over 90% of whom are R&D engineers. As a DAMA China certified team, we are committed to driving manufacturing digital transformation through technology."}
          </p>
        </div>
      </SectionWrapper>

      {/* 2. Mission & Vision */}
      <SectionWrapper alt>
        <SectionHeading title={isZh ? "使命与愿景" : "Mission & Vision"} />
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <FadeInView delay={0}>
          <div className="card flex flex-col items-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-primary">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-neutral-900">
              {isZh ? "企业使命" : "Mission"}
            </h3>
            <p className="mt-3 text-neutral-500">
              {isZh
                ? "以数据与技术赋能制造业，推动工业智能化升级"
                : "Empower manufacturing with data and technology, driving industrial intelligence"}
            </p>
          </div>
          </FadeInView>
          <FadeInView delay={0.15}>
          <div className="card flex flex-col items-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-primary">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-neutral-900">
              {isZh ? "企业愿景" : "Vision"}
            </h3>
            <p className="mt-3 text-neutral-500">
              {isZh
                ? "成为国内领先的工业互联网与数据治理服务商"
                : "Become China's leading industrial internet and data governance service provider"}
            </p>
          </div>
          </FadeInView>
        </div>
      </SectionWrapper>

      {/* 3. Core Values */}
      <SectionWrapper>
        <SectionHeading title={isZh ? "核心价值观" : "Core Values"} />
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <FadeInView key={i} delay={i * 0.12} distance={24}>
            <div className="card flex flex-col items-center p-8 text-center h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-light text-primary">
                {v.icon}
              </div>
              <h4 className="mt-4 text-lg font-semibold text-neutral-900">{v.title}</h4>
              <p className="mt-2 text-sm text-neutral-500">{v.desc}</p>
            </div>
            </FadeInView>
          ))}
        </div>
      </SectionWrapper>

      {/* 4. Timeline */}
      <SectionWrapper alt>
        <SectionHeading title={isZh ? "发展历程" : "Company History"} />
        <div className="mx-auto max-w-4xl">
          <Timeline milestones={milestones} />
        </div>
      </SectionWrapper>

      {/* 5. Certifications */}
      <SectionWrapper>
        <SectionHeading title={isZh ? "资质荣誉" : "Certifications & Awards"} />
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <FadeInView key={i} delay={i * 0.1} distance={24}>
            <div className="card flex flex-col items-center p-6 text-center h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent-light text-primary">
                <Award className="h-8 w-8" />
              </div>
              <h4 className="mt-4 font-semibold text-neutral-900">{cert.name}</h4>
              <p className="mt-1 text-xs text-neutral-400">{cert.body}</p>
            </div>
            </FadeInView>
          ))}
        </div>
      </SectionWrapper>

      {/* 6. CTA */}
      <SectionWrapper>
        <CTABanner
          locale={locale as Locale}
          title={isZh ? "了解更多合作机会" : "Explore Collaboration Opportunities"}
          subtitle={isZh ? "期待与您携手推进数字化转型" : "Let's drive digital transformation together"}
        />
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";
  return {
    title: isZh ? "关于我们" : "Who We Are",
    description: isZh
      ? "了解广西箩筐信息科技有限公司 - 成立于2020年，70+精英团队，DAMA认证，专注数据治理与工业互联网。"
      : "Learn about LKtechnology - Founded 2020, 70+ professionals, DAMA certified, focused on data governance and industrial internet.",
    alternates: {
      canonical: `/${locale}/who-we-are`,
      languages: { en: "/en/who-we-are", "zh-CN": "/zh-CN/who-we-are" },
    },
  };
}
