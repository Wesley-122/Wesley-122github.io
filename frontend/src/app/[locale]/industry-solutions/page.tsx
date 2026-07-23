import SectionWrapper from "@/components/shared/SectionWrapper";
import PageBanner from "@/components/shared/PageBanner";
import FadeInView from "@/components/shared/FadeInView";
import { Factory, Car, Leaf, Truck, Zap, Cog, ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export default async function IndustrySolutionsPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  const industries = [
    { key: "metallurgy", icon: <Factory className="h-8 w-8" />, title: isZh ? "冶金" : "Metallurgy", desc: isZh ? "钢铁冶金行业数据中台、MES、能源管理、轧辊管理等全链路解决方案。" : "Data middle platform, MES, energy management, roll management for steel and metallurgy." },
    { key: "automotive", icon: <Car className="h-8 w-8" />, title: isZh ? "汽车制造" : "Automotive", desc: isZh ? "汽车供应链管理、工艺文件管理、生产执行系统、质量追溯等数字化方案。" : "Supply chain, process document management, MES, quality traceability for automotive manufacturing." },
    { key: "agriculture", icon: <Leaf className="h-8 w-8" />, title: isZh ? "畜牧农业" : "Agriculture", desc: isZh ? "养殖全产业链数据治理、销售管理系统、供应链追溯等农业数字化方案。" : "Full-chain data governance, sales management, supply chain traceability for livestock and agriculture." },
    { key: "logistics", icon: <Truck className="h-8 w-8" />, title: isZh ? "物流运输" : "Logistics", desc: isZh ? "物流一体化平台、运输管理系统、仓储WMS、司机运营管理等解决方案。" : "Integrated logistics platform, TMS, WMS, driver operations management for logistics." },
    { key: "energy", icon: <Zap className="h-8 w-8" />, title: isZh ? "新能源环保" : "New Energy", desc: isZh ? "动力电池能源管理平台、碳排放监测、能源效率优化等绿色制造方案。" : "Battery energy management, carbon emission monitoring, energy efficiency optimization." },
    { key: "manufacturing", icon: <Cog className="h-8 w-8" />, title: isZh ? "通用制造" : "General Mfg", desc: isZh ? "ERP/MES/CRM/SCM/WMS通用制造系统开发，适配各类型制造企业需求。" : "ERP, MES, CRM, SCM, WMS development adaptable to all types of manufacturing enterprises." },
  ];

  return (
    <>
      <PageBanner
        title={isZh ? "行业解决方案" : "Industry Solutions"}
        subtitle={isZh ? "深耕六大垂直行业，提供精准数字化转型方案" : "Deep expertise across six vertical industries"}
      />
      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, idx) => (
            <FadeInView key={ind.key} delay={idx * 0.1} distance={30}>
            <Link href={`/${locale}/industry-solutions/${ind.key}`} className="card group flex flex-col items-center p-8 text-center h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {ind.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-neutral-900">{ind.title}</h3>
              <p className="mt-3 flex-1 text-sm text-neutral-500">{ind.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                {isZh ? "了解详情" : "Learn more"} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            </FadeInView>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: (await params).locale === "zh-CN" ? "行业解决方案" : "Industry Solutions",
    description: (await params).locale === "zh-CN" ? "冶金、汽车制造、畜牧农业、物流运输、新能源环保、通用制造六大行业数字化转型解决方案。" : "Digital transformation solutions for metallurgy, automotive, agriculture, logistics, new energy, and manufacturing.",
    alternates: { canonical: `/${locale}/industry-solutions`, languages: { en: "/en/industry-solutions", "zh-CN": "/zh-CN/industry-solutions" } },
  };
}
