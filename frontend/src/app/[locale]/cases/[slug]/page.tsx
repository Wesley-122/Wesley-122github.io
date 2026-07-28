import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";
import PageBanner from "@/components/shared/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, Tag } from "lucide-react";
import type { Locale } from "@/types/content";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Case data — mirrors the list page, extended with full description
const casesData: Record<
  string,
  {
    title: { zh: string; en: string };
    clientName: { zh: string; en: string };
    industry: { zh: string; en: string };
    summary: { zh: string; en: string };
    fullDescription: { zh: string; en: string };
    technologies: string[];
    thumbnailUrl: string;
  }
> = {
  "liugang-logistics-data-platform": {
    title: { zh: "柳钢物流一体化数据中台", en: "Liugang Logistics Data Middle Platform" },
    clientName: { zh: "柳钢集团", en: "Liugang Group" },
    industry: { zh: "冶金制造", en: "Metallurgy Mfg" },
    summary: { zh: "构建涵盖合同、价格、运力、仓储、港口等中心板块，打通各基地物流数据壁垒，实现物流过程透明化、数据共享与互联互通。", en: "Integrated logistics platform covering contracts, pricing, capacity, warehousing, and ports for transparent logistics." },
    fullDescription: {
      zh: "为柳钢集团构建物流一体化数据中台，打通采购、仓储、运输全链路数据，实现物流数据实时分析与智能调度。项目涵盖合同管理、价格管理、运力调度、仓储管理、港口管理等核心板块，打通各基地物流数据壁垒，实现物流过程透明化、数据共享与互联互通，汽运与联运成本有效降低。",
      en: "Built an integrated logistics data middle platform for Liugang Group, connecting procurement, warehousing, and transportation data chains. The project covers contract management, pricing, capacity scheduling, warehousing, and port management modules, breaking down data silos across bases to achieve transparent logistics and significant cost reduction.",
    },
    technologies: ["数据中台", "ETL", "BI", "iPaaS"],
    thumbnailUrl: "/images/cases/steel-plant.png",
  },
  "baojun-process-management": {
    title: { zh: "宝骏工艺文件管理系统", en: "Baojun Process Document Mgmt" },
    clientName: { zh: "上汽通用五菱", en: "SGMW" },
    industry: { zh: "汽车工业", en: "Automotive Industry" },
    summary: { zh: "聚焦总装车间工艺数据全生命周期管理，建立统一文控体系与版本管理机制，实现工艺文件线上审批、安全共享与快速下发。", en: "Assembly workshop process lifecycle management with unified document control, online approval, and secure sharing." },
    fullDescription: {
      zh: "为上汽通用五菱宝骏基地开发工艺文件管理系统，聚焦总装车间工艺数据全生命周期管理。建立统一文控体系与版本管理机制，实现工艺文件线上审批、安全共享与快速下发，文件流转效率大幅提升。系统覆盖文件创建、审批、发布、归档全流程，支持版本追溯与权限管控。",
      en: "Developed a process document management system for SGMW Baojun manufacturing base, focusing on assembly workshop process data lifecycle management. Established a unified document control system with version management, enabling online approval, secure sharing, and rapid distribution with significant efficiency improvements.",
    },
    technologies: ["MES", "文档管理", "Vue.js", "Spring Boot"],
    thumbnailUrl: "/images/cases/auto-assembly.png",
  },
  "liugang-roll-management": {
    title: { zh: "柳钢冷轧轧辊管理系统", en: "Liugang Cold Roll Mgmt System" },
    clientName: { zh: "柳钢中金", en: "Liugang Zhongjin" },
    industry: { zh: "冶金制造", en: "Metallurgy Mfg" },
    summary: { zh: "轧辊全生命周期管理，覆盖采购、使用、研磨、报废全过程，降低轧辊消耗成本。", en: "Roll lifecycle management covering procurement, usage, grinding, and retirement to reduce costs." },
    fullDescription: {
      zh: "为柳钢中金开发冷轧轧辊全生命周期管理系统，覆盖轧辊采购、入库、使用跟踪、研磨管理、报废处理全过程。系统实现轧辊档案电子化、使用次数自动统计、研磨量智能计算，有效降低轧辊消耗成本，提高轧辊利用率。",
      en: "Developed a cold roll lifecycle management system for Liugang Zhongjin, covering procurement, warehousing, usage tracking, grinding management, and retirement. The system digitizes roll records, auto-counts usage, and intelligently calculates grinding amounts to reduce costs and improve utilization.",
    },
    technologies: ["Java", "Spring Boot", "物联网", "MySQL"],
    thumbnailUrl: "/images/cases/steel-rolling.png",
  },
  "dafeng-data-governance": {
    title: { zh: "大丰禽业数据质量梳理", en: "Dafeng Poultry Data Quality" },
    clientName: { zh: "大丰禽业", en: "Dafeng Poultry" },
    industry: { zh: "畜牧农业", en: "Agriculture" },
    summary: { zh: "实现大丰禽业业务全流程数字化，覆盖禽蛋、禽肉等5条产业链系统管理，从数据录入到可视化报告，形成数据驱动业务的良性循环。", en: "Full-process digitalization covering 5 industry chains, forming a data-driven business cycle." },
    fullDescription: {
      zh: "为大丰禽业实现业务全流程数字化，覆盖禽蛋、禽肉等5条产业链系统管理。项目从数据录入、整理到可视化报告，贯穿养殖、加工、销售全链条，形成数据驱动业务的良性循环。实现了养殖数据标准化、销售流程透明化、财务核算自动化。",
      en: "Achieved full-process digitalization for Dafeng Poultry, covering 5 industry chains including eggs and poultry meat. The project spans data entry, organization, and visualization across breeding, processing, and sales, forming a data-driven business cycle with standardized farming data and automated financial accounting.",
    },
    technologies: ["数据治理", "BI", "养殖系统", "溯源"],
    thumbnailUrl: "/images/cases/poultry-farm.png",
  },
  "saike-energy-management": {
    title: { zh: "赛克瑞浦能源管理系统", en: "Saikeruipu Energy Management" },
    clientName: { zh: "赛克瑞浦", en: "Saikeruipu" },
    industry: { zh: "能源环保", en: "Energy & Environment" },
    summary: { zh: "为20GWh动力电池项目打造统一能源管理系统，覆盖水电气热全介质监测与优化调度，实现「降本、提效、增绿」目标。", en: "Unified energy management for 20GWh battery project covering all media monitoring." },
    fullDescription: {
      zh: "为赛克瑞浦20GWh动力电池项目打造统一能源管理系统，覆盖水、电、气、热全介质监测与优化调度，实现「降本、提效、增绿」目标，保障大规模制造运营可持续性。系统实时采集各产线能耗数据，通过智能分析优化能源分配，降低单位产品能耗成本。",
      en: "Built a unified energy management system for Saikeruipu's 20GWh power battery project, covering water, electricity, gas, and heat monitoring with optimized scheduling. The system achieves cost reduction, efficiency improvement, and green goals through real-time energy data collection and intelligent distribution optimization.",
    },
    technologies: ["IoT", "能源管理", "大屏", "碳监测"],
    thumbnailUrl: "/images/cases/battery-energy.png",
  },
  "dongxin-iot-platform": {
    title: { zh: "东信物联网平台dedge", en: "Dongxin IoT Platform dedge" },
    clientName: { zh: "柳钢东信", en: "Liugang Dongxin" },
    industry: { zh: "智能制造", en: "Intelligent Mfg" },
    summary: { zh: "边缘计算层功能整合，满足工业互联网低时延场景需求，实现设备与云端双向连接、数据采集与远程控制，提升产线生产力并降低现场运维成本。", en: "Edge computing integration for low-latency IIoT needs with device-cloud connectivity." },
    fullDescription: {
      zh: "为柳钢东信打造dedge工业物联网平台，实现边缘计算层功能整合，满足工业互联网低时延场景需求。平台支持设备与云端双向连接、数据采集与远程控制，提升产线生产力并降低现场运维成本。采用MQTT协议实现海量设备接入，边缘节点进行数据预处理与本地决策。",
      en: "Built the dedge IIoT platform for Liugang Dongxin, integrating edge computing capabilities for low-latency industrial internet scenarios. The platform supports device-cloud bidirectional connectivity, data collection, and remote control, improving production line productivity while reducing on-site maintenance costs.",
    },
    technologies: ["物联网", "边缘计算", "MQTT", "Cloud"],
    thumbnailUrl: "/images/cases/iiot-factory.png",
  },
  "trs-sales-management": {
    title: { zh: "唐人神生猪销售系统", en: "TRS Pig Sales System" },
    clientName: { zh: "唐人神集团", en: "TRS Group" },
    industry: { zh: "畜牧农业", en: "Agriculture" },
    summary: { zh: "繁殖场统一销售管理系统，覆盖销售申请、定价策略、订单管理、控料排产、车辆备案、过磅称重、财务结算、票据打印全流程。", en: "Unified sales management covering the entire sales process." },
    fullDescription: {
      zh: "为唐人神集团开发繁殖场统一销售管理系统，覆盖销售申请、定价策略、订单管理、控料排产、车辆备案、过磅称重、财务结算、票据打印全流程，实现操作留痕与数据对接。系统支持移动端操作，方便养殖场一线人员日常使用。",
      en: "Developed a unified sales management system for TRS Group's breeding farms, covering sales applications, pricing strategies, order management, production scheduling, vehicle registration, weighing, financial settlement, and receipt printing. The system supports mobile operations for farm staff.",
    },
    technologies: ["ERP", "移动端", "称重系统", "结算"],
    thumbnailUrl: "/images/cases/livestock-farm.png",
  },
  "ok-driver-management": {
    title: { zh: "OK出行司机管理系统", en: "OK Chuxing Driver Mgmt System" },
    clientName: { zh: "OK出行", en: "OK Chuxing" },
    industry: { zh: "运输物流", en: "Transport Logistics" },
    summary: { zh: "为OK出行定制开发的司机线上缴费与培训管理系统，涵盖自动出账、欠费催收、安全教育培训等功能，配套移动APP。", en: "Custom driver payment and training management system with mobile app." },
    fullDescription: {
      zh: "为OK出行定制开发的司机线上缴费与培训管理系统，涵盖自动出账、欠费催收、安全教育培训等功能，配套移动APP方便出租车司机日常使用。系统实现了司机全生命周期管理，包括入职审核、日常考勤、费用缴纳、安全培训、绩效考核等模块。",
      en: "Custom-developed driver payment and training management system for OK Chuxing, covering auto billing, arrears collection, and safety education with a companion mobile app for taxi drivers. The system manages the full driver lifecycle including onboarding, attendance, payments, training, and performance evaluation.",
    },
    technologies: ["运营系统", "司机管理", "数据大屏", "移动端"],
    thumbnailUrl: "/images/cases/fleet-management.png",
  },
};

export default async function CaseDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const isZh = locale === "zh-CN";
  const caseData = casesData[slug];

  if (!caseData) {
    notFound();
  }

  return (
    <>
      <PageBanner
        title={isZh ? caseData.title.zh : caseData.title.en}
        subtitle={`${isZh ? "客户" : "Client"}: ${isZh ? caseData.clientName.zh : caseData.clientName.en} | ${isZh ? "行业" : "Industry"}: ${isZh ? caseData.industry.zh : caseData.industry.en}`}
      />

      <SectionWrapper>
        <div className="mx-auto max-w-4xl">
          {/* Back link */}
          <Link
            href={`/${locale}/cases`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isZh ? "返回案例列表" : "Back to Cases"}
          </Link>

          {/* Hero Image */}
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={caseData.thumbnailUrl}
              alt={isZh ? caseData.title.zh : caseData.title.en}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Meta */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-accent-light px-4 py-2 text-sm text-primary">
              <Building2 className="h-4 w-4" />
              {isZh ? caseData.clientName.zh : caseData.clientName.en}
            </div>
            <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm text-neutral-600">
              <Tag className="h-4 w-4" />
              {isZh ? caseData.industry.zh : caseData.industry.en}
            </div>
          </div>

          {/* Full Description */}
          <div className="prose prose-neutral max-w-none">
            <h2>{isZh ? "项目概述" : "Project Overview"}</h2>
            <p className="text-lg leading-relaxed text-neutral-700">
              {isZh ? caseData.fullDescription.zh : caseData.fullDescription.en}
            </p>
          </div>

          {/* Technologies */}
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900">
              {isZh ? "技术栈" : "Technologies"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {caseData.technologies.map((tech) => (
                <Badge key={tech} variant="accent">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <CTABanner
          locale={locale as Locale}
          title={isZh ? "了解类似解决方案" : "Explore Similar Solutions"}
          subtitle={isZh ? "联系我们获取定制化方案" : "Contact us for a customized solution"}
        />
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const isZh = locale === "zh-CN";
  const caseData = casesData[slug];

  if (!caseData) {
    return { title: "Case Not Found" };
  }

  return {
    title: isZh ? caseData.title.zh : caseData.title.en,
    description: isZh ? caseData.summary.zh : caseData.summary.en,
    alternates: {
      canonical: `/${locale}/cases/${slug}`,
      languages: { en: `/en/cases/${slug}`, "zh-CN": `/zh-CN/cases/${slug}` },
    },
  };
}
