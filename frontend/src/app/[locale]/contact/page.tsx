import SectionWrapper from "@/components/shared/SectionWrapper";
import PageBanner from "@/components/shared/PageBanner";
import ContactForm from "@/components/forms/ContactForm";
import CompanyLocationSection from "@/components/sections/CompanyLocationSection";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  return (
    <>
      <PageBanner
        title={isZh ? "联系我们" : "Contact Us"}
        subtitle={isZh ? "期待与您合作，共同探索数字化转型之路" : "We look forward to collaborating with you"}
      />

      <SectionWrapper>
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">
              {isZh ? "在线咨询" : "Online Inquiry"}
            </h2>
            <ContactForm locale={locale as "zh-CN" | "en"} />
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">
              {isZh ? "联系信息" : "Contact Information"}
            </h2>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-light text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">{isZh ? "地址" : "Address"}</h4>
                  <div className="mt-1 space-y-1 text-sm text-neutral-500">
                    <p>{isZh ? "总部：南宁市·青秀区民族大道89号金禄大厦11层G座" : "HQ: 11F-G, Jinlu Bldg, 89 Minzu Ave, Qingxiu, Nanning"}</p>
                    <p>{isZh ? "运营中心：柳州市·城中区桂中大道南端6号九洲国际20层" : "Ops: 20F, Jiuzhou International, 6 Guizhong Ave S, Chengzhong, Liuzhou"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-light text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">{isZh ? "电话" : "Phone"}</h4>
                  <a href="tel:18010129259" className="mt-1 block text-sm text-neutral-500 hover:text-primary transition-colors">{isZh ? "朱政梅 · " : "Zhu Zhengmei · "}18010129259</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-light text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">{isZh ? "邮箱" : "Email"}</h4>
                  <a href="mailto:markting@lk-it.cn" className="mt-1 block text-sm text-neutral-500 hover:text-primary transition-colors">markting@lk-it.cn</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-light text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">{isZh ? "工作时间" : "Business Hours"}</h4>
                  <p className="mt-1 text-sm text-neutral-500">
                    {isZh ? "周一至周五 9:00 - 18:00" : "Monday - Friday, 9:00 AM - 6:00 PM"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </SectionWrapper>

      {/* 公司位置 — 与"关于我们"页面共用同一组件，视觉 100% 一致 */}
      <CompanyLocationSection isZh={isZh} />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: (await params).locale === "zh-CN" ? "联系我们" : "Contact Us",
    description: (await params).locale === "zh-CN" ? "广西箩筐信息科技有限公司联系方式 - 总部南宁、运营中心柳州、电话、在线咨询表单。" : "Contact LKtechnology — HQ in Nanning, Operations in Liuzhou, phone, email, and online inquiry form.",
    alternates: { canonical: `/${locale}/contact`, languages: { en: "/en/contact", "zh-CN": "/zh-CN/contact" } },
  };
}
