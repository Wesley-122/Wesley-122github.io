import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | LKtechnology - Data Governance & Industrial Internet",
    default: "LKtechnology广西箩筐信息科技 - 数据治理与工业互联网服务商",
  },
  description:
    "广西箩筐信息科技有限公司(LKtechnology)专注数据治理与工业互联网，DAMA中国认证团队，提供数据产品实施覆盖、定制化开发服务、信息化人才赋能。服务柳钢集团、柳工集团、上汽通用五菱等行业龙头。",
  keywords: [
    "广西数据治理", "工业互联网平台", "数据中台建设", "制造业MES",
    "冶金数字化", "汽车工业数字化", "IT人才服务", "LKtechnology",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    languages: {
      "zh-CN": "/zh-CN",
      en: "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "LKtechnology箩筐信息科技",
    title: "LKtechnology广西箩筐信息科技 - 数据治理与工业互联网服务商",
    description: "专注数据治理与工业互联网，技术驱动企业数字化转型。DAMA中国认证团队，70+精英保障交付。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
