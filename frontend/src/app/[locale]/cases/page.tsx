import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import PageBanner from "@/components/shared/PageBanner";
import CaseCard from "@/components/sections/CaseCard";

type Props = { params: Promise<{ locale: string }> };

export default async function CasesPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  const cases = [
    { slug: "liugang-logistics-data-platform", title: isZh ? "柳钢物流一体化数据中台" : "Liugang Logistics Data Middle Platform", clientName: isZh ? "柳钢集团" : "Liugang Group", industry: isZh ? "冶金" : "Metallurgy", summary: isZh ? "为柳钢集团构建物流一体化数据中台，打通采购、仓储、运输全链路数据。" : "Integrated logistics data middle platform connecting procurement, warehousing, and transportation.", technologies: ["数据中台", "ETL", "BI", "iPaaS"], thumbnailUrl: "/images/cases/steel-plant.svg" },
    { slug: "baojun-process-management", title: isZh ? "宝骏工艺文件管理系统" : "Baojun Process Document Mgmt", clientName: isZh ? "上汽通用五菱" : "SGMW", industry: isZh ? "汽车制造" : "Automotive", summary: isZh ? "为上汽通用五菱宝骏基地开发工艺文件管理系统，实现生产工艺数字化管理。" : "Digital process document management for SGMW Baojun manufacturing base.", technologies: ["MES", "Vue.js", "文档管理", "Spring Boot"], thumbnailUrl: "/images/cases/auto-assembly.svg" },
    { slug: "liugang-roll-management", title: isZh ? "柳钢中金轧辊全生命周期管理系统" : "Liugang Roll Lifecycle Mgmt", clientName: isZh ? "柳钢中金" : "Liugang Zhongjin", industry: isZh ? "冶金" : "Metallurgy", summary: isZh ? "轧辊全生命周期管理系统，覆盖采购、使用、研磨、报废全过程。" : "Roll lifecycle management covering procurement, usage, grinding, and retirement.", technologies: ["Java", "Spring Boot", "物联网", "MySQL"], thumbnailUrl: "/images/cases/steel-rolling.svg" },
    { slug: "dafeng-data-governance", title: isZh ? "大丰禽业全产业链数据治理" : "Dafeng Poultry Data Governance", clientName: isZh ? "大丰禽业" : "Dafeng Poultry", industry: isZh ? "畜牧农业" : "Agriculture", summary: isZh ? "为大丰禽业构建全产业链数据治理平台，实现养殖到销售全链路数据打通。" : "Full-chain data governance platform from breeding to sales for Dafeng Poultry.", technologies: ["数据治理", "BI", "养殖系统", "溯源"], thumbnailUrl: "/images/cases/poultry-farm.svg" },
    { slug: "saike-energy-management", title: isZh ? "赛克瑞浦动力电池能源管理平台" : "Saikeruipu Battery Energy Mgmt", clientName: isZh ? "赛克瑞浦" : "Saikeruipu", industry: isZh ? "新能源环保" : "New Energy", summary: isZh ? "动力电池能源管理平台，实时监控电池生产能耗与碳排放数据。" : "Battery energy management platform for real-time production energy monitoring.", technologies: ["IoT", "能源管理", "大屏", "碳监测"], thumbnailUrl: "/images/cases/battery-energy.svg" },
    { slug: "dongxin-iot-platform", title: isZh ? "东信dedge工业物联网平台" : "Dongxin dedge IIoT Platform", clientName: isZh ? "柳钢东信" : "Liugang Dongxin", industry: isZh ? "冶金" : "Metallurgy", summary: isZh ? "工业物联网边缘计算平台，实现设备数据采集、边缘处理与云端协同。" : "IIoT edge computing platform for device data collection and cloud-edge collaboration.", technologies: ["物联网", "边缘计算", "MQTT", "Cloud"], thumbnailUrl: "/images/cases/iiot-factory.svg" },
    { slug: "trs-sales-management", title: isZh ? "唐人神生猪销售管理系统" : "TRS Pig Sales Management", clientName: isZh ? "唐人神" : "TRS Group", industry: isZh ? "畜牧农业" : "Agriculture", summary: isZh ? "生猪销售全流程管理系统，覆盖订单、出栏、称重、结算全链路。" : "Full-process pig sales management covering orders, output, weighing, and settlement.", technologies: ["ERP", "移动端", "称重系统", "结算"], thumbnailUrl: "/images/cases/livestock-farm.svg" },
    { slug: "ok-driver-management", title: isZh ? "OK出行司机运营管理系统" : "OK Chuxing Driver Ops System", clientName: isZh ? "OK出行" : "OK Chuxing", industry: isZh ? "物流运输" : "Logistics", summary: isZh ? "出行平台司机全生命周期运营管理系统，提升运力管理效率。" : "Driver lifecycle operations management system for ride-hailing platform efficiency.", technologies: ["运营系统", "司机管理", "数据大屏", "移动端"], thumbnailUrl: "/images/cases/fleet-management.svg" },
  ];

  return (
    <>
      <PageBanner
        title={isZh ? "成功案例" : "Success Cases"}
        subtitle={isZh ? "8大标杆项目，覆盖冶金、汽车、畜牧、物流、新能源等行业" : "8 benchmark projects across metallurgy, automotive, agriculture, logistics, and energy"}
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
    description: isZh ? "柳钢物流一体化数据中台、宝骏工艺管理系统等8个标杆项目，见证工业数字化转型实战成果。" : "8 benchmark projects including Liugang logistics platform and Baojun process management system.",
    alternates: { canonical: `/${locale}/cases`, languages: { en: "/en/cases", "zh-CN": "/zh-CN/cases" } },
  };
}
