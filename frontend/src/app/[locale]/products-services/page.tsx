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
        subtitle={isZh ? "三大业务板块，覆盖企业全链路数字化需求" : "Three business pillars covering enterprise digital needs"}
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
      ? "数据产品实施覆盖、定制化开发服务、信息化人才赋能三大核心业务，覆盖企业数字化转型全场景。DAMA中国认证团队，70+精英保障交付。"
      : "Data product implementation, custom development services, and IT talent empowerment covering enterprise digital transformation. DAMA China certified team.",
    alternates: {
      canonical: `/${locale}/products-services`,
      languages: { en: "/en/products-services", "zh-CN": "/zh-CN/products-services" },
    },
  };
}
