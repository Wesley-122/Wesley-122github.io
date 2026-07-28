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
    { key: "metallurgy", icon: <Factory className="h-6 w-6" />, title: isZh ? "冶金制造" : "Metallurgy Mfg", desc: isZh ? "钢铁冶金行业数据中台、MES、能源管理、轧辊管理等全链路解决方案。" : "Data middle platform, MES, energy management, roll management for steel and metallurgy." },
    { key: "automotive", icon: <Car className="h-6 w-6" />, title: isZh ? "汽车工业" : "Automotive Industry", desc: isZh ? "汽车供应链管理、工艺文件管理、生产执行系统、质量追溯等数字化方案。" : "Supply chain, process document management, MES, quality traceability for automotive industry." },
    { key: "agriculture", icon: <Leaf className="h-6 w-6" />, title: isZh ? "畜牧农业" : "Agriculture", desc: isZh ? "养殖全产业链数据治理、销售管理系统、供应链追溯等农业数字化方案。" : "Full-chain data governance, sales management, supply chain traceability for livestock and agriculture." },
    { key: "logistics", icon: <Truck className="h-6 w-6" />, title: isZh ? "运输物流" : "Transport Logistics", desc: isZh ? "物流一体化平台、运输管理系统、仓储WMS、司机运营管理等解决方案。" : "Integrated logistics platform, TMS, WMS, driver operations management for logistics." },
    { key: "energy", icon: <Zap className="h-6 w-6" />, title: isZh ? "能源环保" : "Energy & Environment", desc: isZh ? "动力电池能源管理平台、碳排放监测、能源效率优化等绿色制造方案。" : "Battery energy management, carbon emission monitoring, energy efficiency optimization." },
    { key: "manufacturing", icon: <Cog className="h-6 w-6" />, title: isZh ? "智能制造" : "Intelligent Mfg", desc: isZh ? "ERP/MES/CRM/SCM/WMS等制造系统开发，适配各类型制造企业需求。" : "ERP, MES, CRM, SCM, WMS development adaptable to all types of manufacturing enterprises." },
  ];

  return (
    <>
      <PageBanner
        title={isZh ? "行业解决方案" : "Industry Solutions"}
        subtitle={isZh ? "深耕六大行业，提供精准数字化转型方案" : "Deep expertise across six industries"}
      />
      <SectionWrapper className="relative z-10 !pt-6 md:!pt-8 !pb-24 md:!pb-32">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, idx) => (
            <FadeInView key={ind.key} delay={idx * 0.06} distance={20}>
            <Link href={`/${locale}/industry-solutions/${ind.key}`} className="card group flex flex-col items-center p-5 text-center h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {ind.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{ind.title}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-500">{ind.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                {isZh ? "了解详情" : "Learn more"} <ArrowRight className="h-3.5 w-3.5" />
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
    description: (await params).locale === "zh-CN" ? "智能制造、冶金制造、汽车工业、畜牧农业、运输物流、能源环保六大行业数字化转型解决方案。" : "Digital transformation solutions for intelligent mfg, metallurgy, automotive, agriculture, transport logistics, and energy & environment.",
    alternates: { canonical: `/${locale}/industry-solutions`, languages: { en: "/en/industry-solutions", "zh-CN": "/zh-CN/industry-solutions" } },
  };
}
