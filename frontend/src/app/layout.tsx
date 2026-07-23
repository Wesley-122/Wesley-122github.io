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
    template: "%s | LKtechnology - Industrial Internet & Data Governance",
    default: "LKtechnology箩筐信息科技 - 广西工业互联网与数据治理服务商",
  },
  description:
    "广西箩筐信息科技有限公司(LKtechnology)专注数据治理与工业互联网，提供数据中台、MES/ERP/CRM/SCM/WMS系统开发、技术人力外包服务。服务柳钢、上汽通用五菱、柳工集团等行业龙头。",
  keywords: [
    "广西数据治理", "柳州MES开发", "工业互联网平台", "制造业数据中台",
    "冶金数字化", "汽车供应链系统", "IT驻场外包", "LKtechnology",
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
    title: "LKtechnology箩筐信息科技 - 工业互联网与数据治理服务商",
    description: "专注数据治理与工业互联网，技术驱动制造企业数字化转型",
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
