import { getTranslations } from "next-intl/server";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import PageBanner from "@/components/shared/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import Timeline from "@/components/sections/Timeline";
import FadeInView from "@/components/shared/FadeInView";
import CertCard from "@/components/sections/CertCard";
import BaiduMap, { type MapLocation } from "@/components/map/BaiduMap";
import { Users, Lightbulb, Target, Eye } from "lucide-react";
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
    { year: "2020", title: isZh ? "公司成立" : "Founded", description: isZh ? "9月，广西箩筐信息科技有限公司正式成立，定位工业互联网与数据治理方向。" : "September - LKtechnology founded, focusing on industrial internet and data governance." },
    { year: "2021", title: isZh ? "DAMA认证" : "DAMA Certified", description: isZh ? "团队获得DAMA中国数据治理认证，成为广西首家DAMA认证实施团队。" : "Team earned DAMA China data governance certification, the first in Guangxi." },
    { year: "2022", title: isZh ? "华为云精英服务商" : "Huawei Cloud Partner", description: isZh ? "正式成为华为云精英服务商，拓展云服务业务版图。" : "Became Huawei Cloud Elite Service Partner, expanding cloud service capabilities." },
    { year: "2023", title: isZh ? "高新技术企业" : "High-Tech Enterprise", description: isZh ? "荣获国家高新技术企业认定，团队规模突破50人。" : "Certified as National High-Tech Enterprise; team grew beyond 50." },
    { year: "2024", title: isZh ? "标杆项目落地" : "Benchmark Projects", description: isZh ? "柳钢物流数据中台、宝骏工艺系统等多个大型项目成功交付，团队突破70人。" : "Delivered multiple major projects; team grew to 70+." },
    { year: "2025", title: isZh ? "行业深耕" : "Industry Expansion", description: isZh ? "业务覆盖冶金制造、汽车工业、畜牧农业、运输物流、能源环保六大行业，持续深耕企业数字化转型。" : "Expanded to 6 industries, deepening enterprise digital transformation across sectors." },
  ];

  const certifications = [
    { name: isZh ? "国家高新技术企业" : "National High-Tech Enterprise", body: isZh ? "科技部/财政部/税务总局" : "Ministry of Science & Technology", image: "/images/certifications/cert-row1-col1.png" },
    { name: isZh ? "华为云精英服务商" : "Huawei Cloud Elite Service Partner", body: isZh ? "华为云计算技术有限公司" : "Huawei Cloud", image: "/images/certifications/cert-row1-col3.png" },
    { name: isZh ? "DAMA中国认证实施团队" : "DAMA China Certified Team", body: isZh ? "DAMA中国" : "DAMA China", image: "/images/certifications/cert-row2-col1.png" },
    { name: isZh ? "柳州市互联网协会会员" : "Liuzhou Internet Association Member", body: isZh ? "柳州市互联网协会" : "Liuzhou Internet Association", image: "/images/certifications/cert-row2-col2.png" },
    { name: isZh ? "软件著作权多项" : "Software Copyrights", body: isZh ? "国家版权局" : "National Copyright Administration", image: "/images/certifications/cert-row2-col3.png" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: isZh ? "广西箩筐信息科技有限公司" : "GUANGXI LUOKUANG INFORMATION TECHNOLOGY CORPORATION",
            alternateName: "LKtechnology",
            foundingDate: "2020-09",
            numberOfEmployees: "70",
            address: {
              "@type": "PostalAddress",
              addressLocality: isZh ? "南宁" : "Nanning",
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
          ? "专注数据治理与工业互联网，技术驱动企业数字化转型"
          : "Driving enterprise digital transformation through data governance and industrial internet"}
      />

      {/* 1. Company Intro */}
      <SectionWrapper>
        <SectionHeading title={isZh ? "企业简介" : "About Us"} />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-neutral-600">
            {isZh
              ? "广西箩筐信息科技有限公司（LKtechnology）成立于2020年9月，专注工业互联网与数据治理领域，以技术驱动企业数字化转型为核心，业务涵盖信息化外包、系统开发、数据治理及行业解决方案。公司为柳钢、柳工、上通五菱等企业提供驻场技术支持和定制化系统开发，成功打造和实施工业MES系统、汽车供应链系统、数据治理项目、物联网平台等项目。现有70+人精英团队（技术研发占比90%以上），作为DAMA中国认证团队，致力于为企业提供全方位的数字化转型解决方案。"
              : "GUANGXI LUOKUANG INFORMATION TECHNOLOGY CORPORATION (LKtechnology), founded in September 2020, is a high-tech enterprise focused on industrial internet and data governance. Headquartered in Nanning, Guangxi, we have 70+ professionals, over 90% of whom are R&D engineers. As a DAMA China certified team, we are committed to driving enterprise digital transformation through technology."}
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

      {/* 4. Timeline — 全宽区块，不能有 overflow:hidden 否则 sticky 失效 */}
      <section className="section-alt pt-20 md:pt-28">
        <div className="section-container">
          <SectionHeading title={isZh ? "发展历程" : "Company History"} />
        </div>
        <Timeline milestones={milestones} />
      </section>

      {/* 5. Certifications */}
      <SectionWrapper>
        <SectionHeading title={isZh ? "资质荣誉" : "Certifications & Awards"} />
        <p className="mx-auto max-w-3xl mb-8 text-center text-sm text-neutral-400">
          {isZh
            ? "注：高新技术企业证书、华为云精英服务商证书、互联网协会会员证书及软件著作权证书登记主体均为「柳州箩筐信息科技有限公司」，该公司为广西箩筐信息科技有限公司的关联公司，相关资质属于同一集团所有。"
            : "Note: The High-Tech Enterprise certificate, Huawei Cloud partner certificate, Internet Association membership, and software copyrights are registered under \"Liuzhou Luokuang Information Technology Co., Ltd.\", a related company within the same group as GUANGXI LUOKUANG INFORMATION TECHNOLOGY CORPORATION."}
        </p>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <FadeInView key={i} delay={i * 0.1} distance={24}>
              <CertCard
                name={cert.name}
                body={cert.body}
                image={cert.image}
                delay={i * 0.1}
              />
            </FadeInView>
          ))}
        </div>
      </SectionWrapper>

      {/* 6. Company Location */}
      <SectionWrapper alt>
        <SectionHeading
          title={isZh ? "公司位置" : "Our Locations"}
          subtitle={isZh
            ? "总部（南宁）· 运营中心（柳州）"
            : "HQ (Nanning) · Operations Center (Liuzhou)"}
        />
        <div className="mx-auto max-w-4xl">
          <BaiduMap
            locations={[
              {
                longitude: 108.3665,
                latitude: 22.8173,
                title: isZh ? "总部 · 南宁" : "HQ · Nanning",
                address: isZh
                  ? "青秀区民族大道89号金禄大厦11层G座"
                  : "11F-G, Jinlu Bldg, 89 Minzu Ave, Qingxiu",
              },
              {
                longitude: 109.433,
                latitude: 24.325,
                title: isZh ? "运营中心 · 柳州" : "Ops Center · Liuzhou",
                address: isZh
                  ? "城中区桂中大道南端6号九洲国际20层"
                  : "20F, Jiuzhou Intl, 6 Guizhong Ave S, Chengzhong",
              },
            ]}
            zoom={12}
            height="450px"
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <h4 className="font-semibold text-neutral-900">
                {isZh ? "🏢 总部（南宁）" : "🏢 HQ (Nanning)"}
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                {isZh
                  ? "南宁市·青秀区民族大道89号金禄大厦11层G座"
                  : "11F-G, Jinlu Bldg, 89 Minzu Ave, Qingxiu, Nanning"}
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <h4 className="font-semibold text-neutral-900">
                {isZh ? "🏢 运营中心（柳州）" : "🏢 Operations Center (Liuzhou)"}
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                {isZh
                  ? "柳州市·城中区桂中大道南端6号九洲国际20层"
                  : "20F, Jiuzhou Intl, 6 Guizhong Ave S, Chengzhong, Liuzhou"}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 7. CTA */}
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
      ? "了解广西箩筐信息科技有限公司 - 成立于2020年9月，70+精英团队，DAMA中国认证，专注工业互联网与数据治理。"
      : "Learn about LKtechnology - Founded September 2020, 70+ professionals, DAMA China certified, focused on industrial internet and data governance.",
    alternates: {
      canonical: `/${locale}/who-we-are`,
      languages: { en: "/en/who-we-are", "zh-CN": "/zh-CN/who-we-are" },
    },
  };
}
