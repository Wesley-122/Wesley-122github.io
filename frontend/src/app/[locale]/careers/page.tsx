import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import PageBanner from "@/components/shared/PageBanner";
import JobCard from "@/components/sections/JobCard";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh-CN";

  const jobs = [
    { slug: "java-developer", title: isZh ? "Java高级开发工程师" : "Senior Java Developer", department: isZh ? "研发部" : "R&D", location: isZh ? "柳州" : "Liuzhou", type: "full_time" as const, salaryRange: isZh ? "10K-18K" : "10K-18K CNY" },
    { slug: "frontend-developer", title: isZh ? "前端开发工程师" : "Frontend Developer", department: isZh ? "研发部" : "R&D", location: isZh ? "柳州" : "Liuzhou", type: "full_time" as const, salaryRange: isZh ? "8K-15K" : "8K-15K CNY" },
    { slug: "data-engineer", title: isZh ? "数据治理工程师" : "Data Governance Engineer", department: isZh ? "数据部" : "Data Dept", location: isZh ? "柳州" : "Liuzhou", type: "full_time" as const, salaryRange: isZh ? "12K-20K" : "12K-20K CNY" },
    { slug: "project-manager", title: isZh ? "项目经理（工业互联网）" : "Project Manager (IIoT)", department: isZh ? "项目部" : "PMO", location: isZh ? "柳州" : "Liuzhou", type: "full_time" as const, salaryRange: isZh ? "15K-25K" : "15K-25K CNY" },
    { slug: "intern-2025", title: isZh ? "技术实习生（2026届）" : "Tech Intern (2026 Graduates)", department: isZh ? "研发部" : "R&D", location: isZh ? "柳州" : "Liuzhou", type: "internship" as const, salaryRange: isZh ? "3K-5K" : "3K-5K CNY" },
  ];

  return (
    <>
      <PageBanner
        title={isZh ? "人才招聘" : "Careers"}
        subtitle={isZh ? "加入我们，共同推动工业数字化变革" : "Join us in driving industrial digital transformation"}
      />
      <SectionWrapper>
        <SectionHeading
          title={isZh ? "在招职位" : "Open Positions"}
          subtitle={isZh ? "70+精英团队，90%技术研发人员，期待你的加入" : "70+ professionals, 90% R&D engineers — join us!"}
        />
        <div className="mx-auto max-w-3xl space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.slug} locale={locale as "zh-CN" | "en"} {...job} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: (await params).locale === "zh-CN" ? "人才招聘" : "Careers",
    description: (await params).locale === "zh-CN" ? "加入广西箩筐信息科技，70+技术精英团队，专注工业互联网与数据治理，欢迎投递简历。" : "Join LKtechnology — 70+ tech team focused on IIoT and data governance.",
    alternates: { canonical: `/${locale}/careers`, languages: { en: "/en/careers", "zh-CN": "/zh-CN/careers" } },
  };
}
