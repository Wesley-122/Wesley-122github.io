import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import PageBanner from "@/components/shared/PageBanner";
import CaseCard from "@/components/sections/CaseCard";

type Props = { params: Promise<{ locale: string }> };

export default async function CasesPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  const cases = [
    { slug: "liugang-logistics-data-platform", title: isZh ? "柳钢物流一体化数据中台" : "Liugang Logistics Data Middle Platform", clientName: isZh ? "柳钢集团" : "Liugang Group", industry: isZh ? "冶金制造" : "Metallurgy Mfg", summary: isZh ? "构建涵盖合同、价格、运力、仓储、港口等中心板块，打通各基地物流数据壁垒，实现物流过程透明化、数据共享与互联互通。" : "Integrated logistics platform covering contracts, pricing, capacity, warehousing, and ports for transparent logistics.", technologies: ["数据中台", "ETL", "BI", "iPaaS"], aiPrompt: "Futuristic logistics command center, holographic cargo ships and trucks floating in mid-air connected by glowing blue data streams, digital twin of a port and steel warehouse, cyan and navy color palette, cinematic volumetric lighting, minimalist cyberpunk interface aesthetic, photorealistic 8K render --ar 16:9" },
    { slug: "baojun-process-management", title: isZh ? "宝骏工艺文件管理系统" : "Baojun Process Document Mgmt", clientName: isZh ? "上汽通用五菱" : "SGMW", industry: isZh ? "汽车工业" : "Automotive Industry", summary: isZh ? "聚焦总装车间工艺数据全生命周期管理，建立统一文控体系与版本管理机制，实现工艺文件线上审批、安全共享与快速下发。" : "Assembly workshop process lifecycle management with unified document control, online approval, and secure sharing.", technologies: ["MES", "文档管理", "Vue.js", "Spring Boot"], aiPrompt: "Abstract digital automotive assembly line, glowing blue wireframe car parts floating through a cyberpunk factory, holographic document nodes connected by light beams, clean white and electric blue tones, soft volumetric fog, sci-fi industrial aesthetic, 8K photorealistic render --ar 16:9" },
    { slug: "liugang-roll-management", title: isZh ? "柳钢冷轧轧辊管理系统" : "Liugang Cold Roll Mgmt System", clientName: isZh ? "柳钢中金" : "Liugang Zhongjin", industry: isZh ? "冶金制造" : "Metallurgy Mfg", summary: isZh ? "轧辊全生命周期管理，覆盖采购、使用、研磨、报废全过程，降低轧辊消耗成本。" : "Roll lifecycle management covering procurement, usage, grinding, and retirement to reduce costs.", technologies: ["Java", "Spring Boot", "物联网", "MySQL"], aiPrompt: "Massive industrial steel rolling mill with glowing neon blue heat signatures on cylindrical rollers, digital twin overlay showing wear analytics in holographic cyan, sparks of light flowing through the production line, dark atmospheric factory with cinematic god rays, sci-fi heavy industry concept art 8K --ar 16:9" },
    { slug: "dafeng-data-governance", title: isZh ? "大丰禽业数据质量梳理" : "Dafeng Poultry Data Quality", clientName: isZh ? "大丰禽业" : "Dafeng Poultry", industry: isZh ? "畜牧农业" : "Agriculture", summary: isZh ? "实现大丰禽业业务全流程数字化，覆盖禽蛋、禽肉等5条产业链系统管理，从数据录入、整理到可视化报告，形成数据驱动业务的良性循环。" : "Full-process digitalization covering 5 industry chains. From data entry to visualization, forming a data-driven business cycle.", technologies: ["数据治理", "BI", "养殖系统", "溯源"], aiPrompt: "Modern high-tech poultry farm with translucent holographic data overlays floating above, glowing blue supply chain lines connecting farm to table, clean minimal white and cyan color palette, geometric data nodes forming a network, bright airy atmosphere, futuristic agricultural technology concept 8K --ar 16:9" },
    { slug: "saike-energy-management", title: isZh ? "赛克瑞浦能源管理系统" : "Saikeruipu Energy Management", clientName: isZh ? "赛克瑞浦" : "Saikeruipu", industry: isZh ? "能源环保" : "Energy & Environment", summary: isZh ? "为20GWh动力电池项目打造统一能源管理系统，覆盖水电气热全介质监测与优化调度，实现「降本、提效、增绿」目标。" : "Unified energy management for 20GWh battery project, covering all media monitoring with cost, efficiency, and green goals.", technologies: ["IoT", "能源管理", "大屏", "碳监测"], aiPrompt: "Massive futuristic battery gigafactory interior, glowing energy flow lines in neon blue and green connecting floating hexagonal battery cells, real-time power graphs holographically projected in the air, clean modern industrial architecture, cold cyan ambient light, ultra-detailed sci-fi concept art 8K --ar 16:9" },
    { slug: "dongxin-iot-platform", title: isZh ? "东信物联网平台dedge" : "Dongxin IoT Platform dedge", clientName: isZh ? "柳钢东信" : "Liugang Dongxin", industry: isZh ? "智能制造" : "Intelligent Mfg", summary: isZh ? "边缘计算层功能整合，满足工业互联网低时延场景需求，实现设备与云端双向连接、数据采集与远程控制，提升产线生产力并降低现场运维成本。" : "Edge computing integration for low-latency IIoT needs. Device-cloud connectivity, data collection, and remote control improving productivity.", technologies: ["物联网", "边缘计算", "MQTT", "Cloud"], aiPrompt: "Abstract edge computing network visualization, glowing blue nodes at factory floor level connecting upward to cloud servers, pulsing data particles flowing through geometric circuit patterns, dark industrial space illuminated by cyan light trails, minimalist tech aesthetic, 8K photorealistic --ar 16:9" },
    { slug: "trs-sales-management", title: isZh ? "唐人神生猪销售系统" : "TRS Pig Sales System", clientName: isZh ? "唐人神集团" : "TRS Group", industry: isZh ? "畜牧农业" : "Agriculture", summary: isZh ? "繁殖场统一销售管理系统，覆盖销售申请、定价策略、订单管理、控料排产、车辆备案、过磅称重、财务结算、票据打印全流程。" : "Unified sales management covering applications, pricing, orders, scheduling, weighing, settlement, and receipt printing.", technologies: ["ERP", "移动端", "称重系统", "结算"], aiPrompt: "Modern livestock trading hub visualization, floating translucent data cards showing pricing and order flow, blue light trails connecting digital weighing scales and logistics vehicles, clean white architecture with cyan accents, bright and airy atmosphere, futuristic agritech concept art 8K --ar 16:9" },
    { slug: "ok-driver-management", title: isZh ? "OK出行司机管理系统" : "OK Chuxing Driver Mgmt System", clientName: isZh ? "OK出行" : "OK Chuxing", industry: isZh ? "运输物流" : "Transport Logistics", summary: isZh ? "为OK出行定制开发的司机线上缴费与培训管理系统，涵盖自动出账、欠费催收、安全教育培训等功能，配套移动APP方便出租车司机日常使用。" : "Custom driver payment and training management system covering auto billing, arrears collection, and safety training with mobile app.", technologies: ["运营系统", "司机管理", "数据大屏", "移动端"], aiPrompt: "Futuristic smart city transportation network, glowing blue route lines connecting floating vehicle icons across a neon-lit cityscape, holographic driver dashboard with abstract data rings, dark navy and cyan color scheme, sleek modern mobility concept, 8K photorealistic render --ar 16:9" },
    { slug: "liugong-scm-platform", title: isZh ? "柳工供应链协同管理平台" : "LiuGong SCM Collaboration Platform", clientName: isZh ? "柳工集团" : "LiuGong Group", industry: isZh ? "智能制造" : "Intelligent Mfg", summary: isZh ? "为柳工打造的供应链协同管理平台，覆盖供应商管理、采购寻源、合同协同、交付跟踪全流程，实现供应链端到端可视化与智能决策。" : "Supply chain collaboration platform covering supplier management, sourcing, contract collaboration, and delivery tracking for end-to-end visibility and intelligent decision-making.", technologies: ["SCM", "供应商管理", "采购协同", "数据大屏"], aiPrompt: "Advanced supply chain visualization, glowing network nodes representing suppliers connected by blue data streams around a central manufacturing hub, holographic inventory shelves and logistics routes, clean industrial aesthetic with cyan and navy tones, 8K photorealistic render --ar 16:9" },
  ];

  return (
    <>
      <PageBanner
        title={isZh ? "成功案例" : "Success Cases"}
        subtitle={isZh ? "标杆项目覆盖冶金制造、汽车工业、畜牧农业、运输物流、能源环保等行业" : "Benchmark projects across metallurgy, automotive, agriculture, logistics, and energy"}
      />
      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, idx) => (
            <CaseCard key={c.slug} locale={locale as "zh-CN" | "en"} {...c} delayIndex={idx} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";
  return {
    title: isZh ? "成功案例" : "Success Cases",
    description: isZh ? "柳钢物流一体化数据中台、宝骏工艺文件管理系统、赛克瑞浦能源管理系统等标杆项目，见证工业数字化转型实战成果。" : "Benchmark projects including Liugang logistics data platform, Baojun process document management, and Saikeruipu energy management.",
    alternates: { canonical: `/${locale}/cases`, languages: { en: "/en/cases", "zh-CN": "/zh-CN/cases" } },
  };
}
