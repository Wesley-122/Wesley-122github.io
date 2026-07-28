"use client";

import { Database, Code2, Users } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import FadeInView from "@/components/shared/FadeInView";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Locale = "zh-CN" | "en";

export default function ProductsClient({ locale }: { locale: Locale }) {
  const isZh = locale === "zh-CN";

  const categories = [
    { key: "data_products", label: isZh ? "数据产品实施覆盖" : "Data Product Implementation", icon: <Database className="h-5 w-5" /> },
    { key: "enterprise_apps", label: isZh ? "定制化开发服务" : "Custom Development Services", icon: <Code2 className="h-5 w-5" /> },
    { key: "talent_services", label: isZh ? "信息化人才赋能" : "IT Talent Empowerment", icon: <Users className="h-5 w-5" /> },
  ];

  const products: Record<string, { title: string; desc: string; features: string[] }[]> = {
    data_products: [
      { title: isZh ? "数据中台" : "Data Middle Platform", desc: isZh ? "构建企业级数据中台，实现数据资产的统一管理、治理与服务，支撑业务智能化决策。" : "Enterprise data middle platform for unified data asset management, governance, and intelligent decision support.", features: isZh ? ["数据集成", "数据开发", "数据治理", "数据服务"] : ["Integration", "Development", "Governance", "Services"] },
      { title: "ETL / iPaaS", desc: isZh ? "异构系统数据集成与清洗，构建企业数据高速公路，打通信息孤岛，实现跨系统数据实时同步。" : "Heterogeneous system data integration to build enterprise data highways.", features: isZh ? ["多源异构", "实时同步", "数据清洗", "API网关"] : ["Multi-Source", "Real-Time", "Cleaning", "API GW"] },
      { title: isZh ? "BI可视化 & 数据大屏" : "BI & Data Dashboard", desc: isZh ? "交互式数据分析与可视化展示，支持定制化数据大屏，实时监控企业核心业务指标。" : "Interactive data visualization with customizable dashboards for real-time KPI monitoring.", features: isZh ? ["自助分析", "拖拽报表", "3D大屏", "移动BI"] : ["Self-Service", "Reports", "3D", "Mobile"] },
      { title: isZh ? "数据资产全生命周期管理" : "Data Asset Lifecycle Mgmt", desc: isZh ? "从数据采集、存储、治理到应用的全生命周期管理，确保数据质量、安全与合规。" : "Full lifecycle management ensuring data quality, security, and compliance.", features: isZh ? ["元数据管理", "数据质量", "数据安全", "数据血缘"] : ["Metadata", "Quality", "Security", "Lineage"] },
    ],
    enterprise_apps: [
      { title: "MES", desc: isZh ? "制造执行系统，实现生产过程透明化、数字化管理，提升生产效率与产品质量。" : "Manufacturing Execution System for transparent, digital production management.", features: isZh ? ["生产调度", "质量追溯", "设备管理", "实时看板"] : ["Scheduling", "Quality", "Equipment", "Dashboard"] },
      { title: "ERP", desc: isZh ? "企业资源计划系统，整合财务、采购、库存、销售等核心业务流程。" : "Enterprise Resource Planning integrating finance, procurement, inventory, and sales.", features: isZh ? ["财务管理", "供应链", "人力资源", "报表分析"] : ["Finance", "SCM", "HR", "Analytics"] },
      { title: "CRM", desc: isZh ? "客户关系管理系统，实现客户全生命周期管理，提升销售转化与客户满意度。" : "Customer Relationship Management for full lifecycle customer management.", features: isZh ? ["客户管理", "销售漏斗", "服务工单", "营销自动化"] : ["Accounts", "Pipeline", "Tickets", "Marketing"] },
      { title: "SCM/WMS", desc: isZh ? "供应链与仓储管理系统，实现采购、库存、物流的全链路数字化管理。" : "Supply Chain & Warehouse Management for digital procurement and logistics.", features: isZh ? ["采购管理", "库存管理", "物流追踪", "供应商协同"] : ["Procurement", "Inventory", "Tracking", "Supplier"] },
      { title: "EMS", desc: isZh ? "能源管理系统，实时监测企业能耗数据，优化能源使用效率，降低碳排放。" : "Energy Management System for real-time monitoring and optimization.", features: isZh ? ["能耗监测", "能效分析", "碳排放", "智能预警"] : ["Monitoring", "Efficiency", "Carbon", "Alerts"] },
      { title: isZh ? "轧辊管理系统" : "Roll Mgmt System", desc: isZh ? "轧辊全生命周期管理，覆盖采购、使用、研磨、报废全过程，降低消耗成本。" : "Roll lifecycle management covering procurement, usage, grinding, and retirement.", features: isZh ? ["轧辊档案", "使用追踪", "研磨管理", "成本分析"] : ["Records", "Tracking", "Grinding", "Cost"] },
    ],
    talent_services: [
      { title: isZh ? "驻场开发" : "On-Site Development", desc: isZh ? "派驻技术团队到客户现场，提供定制化软件开发服务，确保项目高效交付。" : "Deploy tech teams to client sites for custom software development.", features: isZh ? ["Java/Spring", "Vue/React", "数据库", "微服务"] : ["Java/Spring", "Vue/React", "DB", "Microservices"] },
      { title: isZh ? "项目实施" : "Project Implementation", desc: isZh ? "提供从需求分析到系统上线的全流程项目实施服务，保障项目成功落地。" : "Full-cycle implementation from requirements to go-live.", features: isZh ? ["需求分析", "方案设计", "系统实施", "培训上线"] : ["Analysis", "Design", "Implement", "Training"] },
      { title: isZh ? "运维服务" : "Operations & Maintenance", desc: isZh ? "提供7×24小时系统运维保障服务，确保业务系统稳定运行。" : "7×24 operations and maintenance for business continuity.", features: isZh ? ["7×24监控", "故障处理", "性能优化", "安全加固"] : ["24/7", "Troubleshoot", "Performance", "Security"] },
    ],
  };

  return (
    <>
      <SectionWrapper>
        <Tabs defaultValue="data_products" className="w-full">
          <TabsList className="mx-auto mb-12 flex w-fit">
            {categories.map((cat) => (
              <TabsTrigger key={cat.key} value={cat.key} className="gap-2">
                {cat.icon} {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(products).map(([key, items]) => (
            <TabsContent key={key} value={key}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((product, idx) => (
                  <FadeInView key={idx} delay={idx * 0.08} distance={24}>
                  <div className="card flex flex-col p-6 h-full">
                    <h3 className="text-lg font-semibold text-neutral-900">{product.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-neutral-500">{product.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.features.map((f) => (
                        <Badge key={f} variant="accent" className="text-xs">{f}</Badge>
                      ))}
                    </div>
                  </div>
                  </FadeInView>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SectionWrapper>
    </>
  );
}
