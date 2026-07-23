import PageBanner from "@/components/shared/PageBanner";
import ProductsClient from "./ProductsClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsServicesPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  return (
    <>
      <PageBanner
        title={isZh ? "产品与服务" : "Products & Services"}
        subtitle={isZh ? "三大业务板块，覆盖制造企业全链路数字化需求" : "Three business pillars covering manufacturing digital needs"}
      />
      <ProductsClient locale={locale as "zh-CN" | "en"} />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";
  return {
    title: isZh ? "产品与服务" : "Products & Services",
    description: isZh
      ? "全链路数据治理、制造业定制系统开发、技术人力外包三大核心业务，覆盖企业数字化转型全场景。"
      : "Full-chain data governance, custom manufacturing systems, and IT outsourcing covering enterprise digital transformation.",
    alternates: {
      canonical: `/${locale}/products-services`,
      languages: { en: "/en/products-services", "zh-CN": "/zh-CN/products-services" },
    },
  };
}
