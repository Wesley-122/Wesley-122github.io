import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import BaiduMap from "@/components/map/BaiduMap";

interface CompanyLocationSectionProps {
  isZh: boolean;
}

/**
 * 公司位置区块 — 地图 + 地址卡片。
 * 关于我们 / 联系我们两个页面共用，保证视觉 100% 一致。
 */
export default function CompanyLocationSection({ isZh }: CompanyLocationSectionProps) {
  return (
    <SectionWrapper alt>
      <SectionHeading
        title={isZh ? "公司位置" : "Our Locations"}
        subtitle={isZh
          ? "总部（南宁）· 运营中心（柳州）"
          : "HQ (Nanning) · Operations Center (Liuzhou)"}
      />
      <div className="mx-auto max-w-4xl">
        <BaiduMap
          locations={[
            {
              longitude: 108.3665,
              latitude: 22.8173,
              title: isZh ? "总部 · 南宁" : "HQ · Nanning",
              address: isZh
                ? "青秀区民族大道89号金禄大厦11层G座"
                : "11F-G, Jinlu Bldg, 89 Minzu Ave, Qingxiu",
            },
            {
              longitude: 109.433,
              latitude: 24.325,
              title: isZh ? "运营中心 · 柳州" : "Ops Center · Liuzhou",
              address: isZh
                ? "城中区桂中大道南端6号九洲国际20层"
                : "20F, Jiuzhou Intl, 6 Guizhong Ave S, Chengzhong",
            },
          ]}
          zoom={12}
          height="450px"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <h4 className="font-semibold text-neutral-900">
              {isZh ? "🏢 总部（南宁）" : "🏢 HQ (Nanning)"}
            </h4>
            <p className="mt-1 text-sm text-neutral-500">
              {isZh
                ? "南宁市·青秀区民族大道89号金禄大厦11层G座"
                : "11F-G, Jinlu Bldg, 89 Minzu Ave, Qingxiu, Nanning"}
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <h4 className="font-semibold text-neutral-900">
              {isZh ? "🏢 运营中心（柳州）" : "🏢 Operations Center (Liuzhou)"}
            </h4>
            <p className="mt-1 text-sm text-neutral-500">
              {isZh
                ? "柳州市·城中区桂中大道南端6号九洲国际20层"
                : "20F, Jiuzhou Intl, 6 Guizhong Ave S, Chengzhong, Liuzhou"}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
