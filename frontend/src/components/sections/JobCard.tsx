import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import type { Locale } from "@/types/content";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  locale: Locale;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange: string;
}

const typeLabels: Record<string, { zh: string; en: string }> = {
  full_time: { zh: "全职", en: "Full-time" },
  part_time: { zh: "兼职", en: "Part-time" },
  internship: { zh: "实习", en: "Internship" },
  contract: { zh: "合同制", en: "Contract" },
};

export default function JobCard({
  locale,
  slug,
  title,
  department,
  location,
  type,
  salaryRange,
}: JobCardProps) {
  const typeLabel = typeLabels[type] || { zh: type, en: type };

  return (
    <Link
      href={`/${locale}/careers/${slug}`}
      className="group card flex items-center justify-between p-6"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Badge variant="accent">{locale === "zh-CN" ? typeLabel.zh : typeLabel.en}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </span>
          <span>{department}</span>
          <span className="text-primary font-medium">{salaryRange}</span>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
    </Link>
  );
}
