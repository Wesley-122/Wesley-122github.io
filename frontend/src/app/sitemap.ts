import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lk-it.cn";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["zh-CN", "en"];

  const staticRoutes = [
    { path: "", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/who-we-are", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/products-services", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/industry-solutions", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/cases", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/news", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/careers", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/contact", priority: 0.8, changeFreq: "monthly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFreq,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route.path}`])
          ),
        },
      });
    }
  }

  // Dynamic case study pages (8 cases)
  const caseSlugs = [
    "liugang-logistics-data-platform",
    "baojun-process-management",
    "liugang-roll-management",
    "dafeng-data-governance",
    "saike-energy-management",
    "dongxin-iot-platform",
    "trs-sales-management",
    "ok-driver-management",
  ];

  for (const locale of locales) {
    for (const slug of caseSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/cases/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [`${BASE_URL}/${l}/cases/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
