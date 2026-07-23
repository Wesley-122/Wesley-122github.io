import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Locale } from "@/types/content";
import { NAV_ITEMS } from "@/lib/constants";

interface FooterProps {
  locale: Locale;
}

const isZh = (locale: Locale) => locale === "zh-CN";

export default function Footer({ locale }: FooterProps) {
  const zh = isZh(locale);

  const footerLinks = [
    {
      title: zh ? "快速导航" : "Quick Links",
      links: NAV_ITEMS.map((item) => ({
        label: zh ? item.label.zh : item.label.en,
        href: zh ? item.href.zh : item.href.en,
      })),
    },
    {
      title: zh ? "核心业务" : "Core Business",
      links: [
        { label: zh ? "全链路数据治理" : "Data Governance", href: `/${locale}/products-services` },
        { label: zh ? "制造业定制系统" : "Custom Systems", href: `/${locale}/products-services` },
        { label: zh ? "技术人力外包" : "IT Outsourcing", href: `/${locale}/products-services` },
      ],
    },
    {
      title: zh ? "行业方案" : "Industry Solutions",
      links: [
        { label: zh ? "冶金" : "Metallurgy", href: `/${locale}/industry-solutions` },
        { label: zh ? "汽车制造" : "Automotive", href: `/${locale}/industry-solutions` },
        { label: zh ? "畜牧农业" : "Agriculture", href: `/${locale}/industry-solutions` },
        { label: zh ? "物流运输" : "Logistics", href: `/${locale}/industry-solutions` },
        { label: zh ? "新能源环保" : "New Energy", href: `/${locale}/industry-solutions` },
      ],
    },
    {
      title: zh ? "关于我们" : "About",
      links: [
        { label: zh ? "企业简介" : "Company", href: `/${locale}/who-we-are` },
        { label: zh ? "发展历程" : "History", href: `/${locale}/who-we-are` },
        { label: zh ? "资质荣誉" : "Certifications", href: `/${locale}/who-we-are` },
        { label: zh ? "新闻动态" : "News", href: `/${locale}/news` },
        { label: zh ? "加入我们" : "Careers", href: `/${locale}/careers` },
      ],
    },
  ];

  return (
    <footer className="bg-footer-bg text-neutral-300">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo/lk-brand-icon.svg"
                alt="LKtechnology"
                width={36}
                height={36}
                className="h-9 w-9 flex-shrink-0 rounded-lg"
              />
              <span className="text-lg font-semibold text-white">LKtechnology</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {zh
                ? "专注数据治理与工业互联网，技术驱动制造企业数字化转型。"
                : "Driving manufacturing digital transformation through data governance and industrial internet."}
            </p>
            <div className="mt-6 space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-light" />
                <span>
                  {zh ? "总部：南宁市·青秀区民族大道89号金禄大厦11层G座" : "HQ: 11F-G, Jinlu Bldg, 89 Minzu Ave, Qingxiu, Nanning"}
                  <br />
                  {zh ? "运营中心：柳州市·城中区桂中大道南端6号九州国际20层" : "Ops: 20F, Jiuzhou International, 6 Guizhong Ave S, Chengzhong, Liuzhou"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary-light" />
                <a href="tel:18010129259" className="hover:text-white transition-colors">18010129259</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary-light" />
                <a href="mailto:markting@lk-it.cn" className="hover:text-white transition-colors">markting@lk-it.cn</a>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-neutral-500">
            {zh
              ? `© ${new Date().getFullYear()} 广西箩筐信息科技有限公司 LKtechnology. All rights reserved.`
              : `© ${new Date().getFullYear()} Guangxi Luokuang Information Technology Co., Ltd. All rights reserved.`}
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <Link href={`/${locale}/contact`} className="hover:text-neutral-300 transition-colors">
              {zh ? "联系我们" : "Contact"}
            </Link>
            <span>{zh ? "桂ICP备XXXXXXXX号" : "ICP: GUI-XXXXXXXX"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
