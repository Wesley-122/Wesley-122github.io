import { notFound } from "next/navigation";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import PageBanner from "@/components/shared/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import type { Locale } from "@/types/content";

type Props = {
  params: Promise<{ locale: string; key: string }>;
};

// Industry data — aligns with PDF brochure
const industryData: Record<
  string,
  {
    title: { zh: string; en: string };
    description: { zh: string; en: string };
    solutions: { zh: string[]; en: string[] };
    cases: { zh: string[]; en: string[] };
    features: { zh: string[]; en: string[] };
  }
> = {
  metallurgy: {
    title: { zh: "冶金制造", en: "Metallurgy Manufacturing" },
    description: {
      zh: "深耕钢铁冶金行业数字化转型，提供从数据治理到生产执行的全链路解决方案。覆盖数据中台、MES制造执行、能源管理、轧辊管理、气体销售等场景，助力冶金企业实现智能制造升级。",
      en: "Deep expertise in steel and metallurgy digital transformation, providing full-chain solutions from data governance to production execution. Covering data platforms, MES, energy management, roll management, and gas sales systems.",
    },
    solutions: {
      zh: ["MES制造执行系统", "冷轧轧辊管理系统", "气体销售系统", "能源管理系统", "物流一体化数据中台"],
      en: ["MES Manufacturing Execution", "Cold Roll Management", "Gas Sales System", "Energy Management", "Logistics Data Platform"],
    },
    cases: {
      zh: ["柳钢物流一体化数据中台", "柳钢冷轧轧辊管理系统", "东信物联网平台dedge"],
      en: ["Liugang Logistics Data Platform", "Liugang Cold Roll Mgmt System", "Dongxin IoT Platform dedge"],
    },
    features: {
      zh: ["钢铁行业专属数据模型", "全流程质量追溯", "能耗实时监控", "设备预测性维护", "多基地数据打通"],
      en: ["Steel-specific data models", "Full-process quality tracing", "Real-time energy monitoring", "Predictive equipment maintenance", "Multi-site data integration"],
    },
  },
  automotive: {
    title: { zh: "汽车工业", en: "Automotive Industry" },
    description: {
      zh: "专注汽车制造领域数字化，覆盖供应链管理、工艺文件管理、生产执行系统、质量追溯等核心场景。已为多个主机厂及零部件供应商提供定制化系统开发与实施服务。",
      en: "Focused on automotive manufacturing digitalization, covering supply chain management, process document management, MES, and quality traceability for OEMs and tier suppliers.",
    },
    solutions: {
      zh: ["能源管理系统", "工艺文件管理系统", "汽车供应链系统", "质量追溯系统", "生产执行系统MES"],
      en: ["Energy Management", "Process Document Mgmt", "Automotive Supply Chain", "Quality Traceability", "MES"],
    },
    cases: {
      zh: ["宝骏工艺文件管理系统"],
      en: ["Baojun Process Document Management"],
    },
    features: {
      zh: ["总装车间数字化", "工艺文件版本管控", "供应链协同", "质量数据实时采集", "多工厂统一管理"],
      en: ["Assembly shop digitalization", "Process document version control", "Supply chain collaboration", "Real-time quality data", "Multi-plant management"],
    },
  },
  agriculture: {
    title: { zh: "畜牧农业", en: "Livestock & Agriculture" },
    description: {
      zh: "为畜牧养殖和农业企业提供全产业链数字化解决方案，覆盖养殖管理、销售管理、饲料加工、屠宰管理、供应链追溯等环节，助力农业企业实现数据驱动的精细化管理。",
      en: "Full-chain digital solutions for livestock and agriculture covering breeding management, sales, feed processing, slaughter management, and supply chain traceability.",
    },
    solutions: {
      zh: ["生猪销售管理系统", "饲料加工系统", "养殖屠宰管理", "繁殖场统一销售平台", "全产业链数据治理"],
      en: ["Pig Sales Management", "Feed Processing", "Breeding & Slaughter", "Unified Sales Platform", "Full-Chain Data Governance"],
    },
    cases: {
      zh: ["唐人神生猪销售系统", "大丰禽业数据质量梳理"],
      en: ["TRS Pig Sales System", "Dafeng Poultry Data Quality"],
    },
    features: {
      zh: ["养殖数据标准化", "销售全流程追溯", "移动端现场操作", "多养殖场统一管理", "财务自动核算"],
      en: ["Standardized farming data", "Full sales traceability", "Mobile field operations", "Multi-farm management", "Auto financial accounting"],
    },
  },
  logistics: {
    title: { zh: "运输物流", en: "Transport Logistics" },
    description: {
      zh: "提供物流运输行业的数字化解决方案，包括物流一体化平台、运输管理系统、仓储WMS、车辆调度、司机运营管理等，帮助物流企业提升运营效率和服务质量。",
      en: "Digital solutions for transport logistics including integrated logistics platforms, TMS, WMS, vehicle dispatch, and driver operations management to improve efficiency and service quality.",
    },
    solutions: {
      zh: ["司机运营管理系统", "物流管理平台", "车辆调度系统", "仓储配送系统", "物流数据中台"],
      en: ["Driver Operations Mgmt", "Logistics Platform", "Vehicle Dispatch", "Warehousing & Distribution", "Logistics Data Platform"],
    },
    cases: {
      zh: ["OK出行司机管理系统"],
      en: ["OK Chuxing Driver Mgmt System"],
    },
    features: {
      zh: ["实时车辆调度", "司机全生命周期管理", "仓储库存精准化", "配送路径优化", "多式联运数据打通"],
      en: ["Real-time dispatch", "Driver lifecycle management", "Precise inventory control", "Route optimization", "Multi-modal data integration"],
    },
  },
  energy: {
    title: { zh: "能源环保", en: "Energy & Environment" },
    description: {
      zh: "为新能源和环保企业提供能源管理、碳排放监测、能效优化等绿色制造解决方案，助力企业实现「降本、提效、增绿」的可持续发展目标。",
      en: "Green manufacturing solutions for new energy and environmental protection including energy management, carbon emission monitoring, and efficiency optimization for sustainable development.",
    },
    solutions: {
      zh: ["动力电池能源管理平台", "碳排放监测系统", "能效优化系统", "水电气热全介质监控"],
      en: ["Battery Energy Management", "Carbon Emission Monitoring", "Energy Efficiency Optimization", "Multi-Media Monitoring"],
    },
    cases: {
      zh: ["赛克瑞浦能源管理系统"],
      en: ["Saikeruipu Energy Management"],
    },
    features: {
      zh: ["全介质能耗监测", "实时碳排放核算", "智能优化调度", "绿色工厂认证支撑", "大屏驾驶舱展示"],
      en: ["All-media energy monitoring", "Real-time carbon accounting", "Intelligent scheduling", "Green factory certification", "Dashboard visualization"],
    },
  },
  manufacturing: {
    title: { zh: "智能制造", en: "Intelligent Manufacturing" },
    description: {
      zh: "为通用制造企业提供ERP、MES、CRM、SCM、WMS等核心系统开发与集成服务，适配各类型制造企业需求，助力企业实现生产数字化、管理精细化。",
      en: "Core system development and integration for general manufacturing including ERP, MES, CRM, SCM, WMS, adaptable to all types of manufacturing enterprises.",
    },
    solutions: {
      zh: ["ERP企业资源计划", "MES制造执行系统", "CRM客户关系管理", "SCM供应链管理", "WMS仓储管理", "EMS能源管理"],
      en: ["ERP", "MES", "CRM", "SCM", "WMS", "EMS"],
    },
    cases: {
      zh: ["柳钢物流数据中台", "赛克瑞浦能源管理系统", "东信物联网平台dedge"],
      en: ["Liugang Logistics Platform", "Saikeruipu Energy Mgmt", "Dongxin IoT Platform"],
    },
    features: {
      zh: ["模块化架构设计", "敏捷开发交付", "多系统集成能力", "移动端适配", "持续运维保障"],
      en: ["Modular architecture", "Agile delivery", "Multi-system integration", "Mobile adaptation", "Continuous O&M"],
    },
  },
};

export default async function IndustryDetailPage({ params }: Props) {
  const { locale, key } = await params;
  const isZh = locale === "zh-CN";
  const data = industryData[key];

  if (!data) {
    notFound();
  }

  return (
    <>
      <PageBanner
        title={isZh ? data.title.zh : data.title.en}
        subtitle={isZh ? data.description.zh : data.description.en}
      />

      <SectionWrapper>
        <div className="mx-auto max-w-4xl">
          {/* Back link */}
          <Link
            href={`/${locale}/industry-solutions`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isZh ? "返回行业列表" : "Back to Industries"}
          </Link>

          {/* Solutions */}
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            {isZh ? "解决方案" : "Solutions"}
          </h2>
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {(isZh ? data.solutions.zh : data.solutions.en).map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-neutral-700">{s}</span>
              </div>
            ))}
          </div>

          {/* Related Cases */}
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            {isZh ? "相关案例" : "Related Cases"}
          </h2>
          <div className="mb-10 flex flex-wrap gap-2">
            {(isZh ? data.cases.zh : data.cases.en).map((c, i) => (
              <Badge key={i} variant="accent" className="text-sm px-4 py-2">{c}</Badge>
            ))}
          </div>

          {/* Features */}
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            {isZh ? "行业特色" : "Industry Features"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(isZh ? data.features.zh : data.features.en).map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-accent-light p-4">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm font-medium text-neutral-800">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <CTABanner
          locale={locale as Locale}
          title={isZh ? `探索${data.title.zh}解决方案` : `Explore ${data.title.en} Solutions`}
          subtitle={isZh ? "联系我们获取行业专属方案" : "Contact us for industry-specific solutions"}
        />
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, key } = await params;
  const isZh = locale === "zh-CN";
  const data = industryData[key];

  if (!data) {
    return { title: "Industry Not Found" };
  }

  return {
    title: isZh ? data.title.zh : data.title.en,
    description: isZh ? data.description.zh : data.description.en,
    alternates: {
      canonical: `/${locale}/industry-solutions/${key}`,
      languages: { en: `/en/industry-solutions/${key}`, "zh-CN": `/zh-CN/industry-solutions/${key}` },
    },
  };
}
