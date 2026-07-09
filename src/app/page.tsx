import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import ReportCard from "@/components/ReportCard";
import ImageSlot from "@/components/ImageSlot";
import { siteConfig } from "@config";
import { getAll } from "@/lib/content";

export default function Home() {
  const posts = getAll("posts").slice(0, 3);
  const reports = getAll("reports").slice(0, 2);
  return (
    <>
      <Hero />

      {/* 브랜드 소개 스트립 (About 흡수) */}
      <section className="container-page py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">브랜드</p>
            <h2 className="font-display text-3xl font-bold leading-snug text-primary">
              {siteConfig.company.name} 는 나이 드는 방식을 다시 씁니다
            </h2>
            <p className="mt-5 leading-relaxed text-ink-sub">
              억지로 젊어 보이려 애쓰지 않고, 자기답게 멋지게 나이 드는 3040 남성을 위한 브랜드입니다.
              과장하지 않는 단정함으로, 오래 입을 수 있는 옷을 만듭니다.
            </p>
          </div>
          <ImageSlot ratio="4/5" label="브랜드 비주얼" />
        </div>
      </section>

      {/* 최신 블로그 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="저널" title="최신 글" href="/blog" cta="블로그 전체" />
        {posts.length === 0 ? (
          <p className="text-sm text-ink-muted">아직 발행된 글이 없습니다.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>

      {/* 최신 실적 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="데이터" title="실적 보고" href="/reports" cta="실적 전체" />
        {reports.length === 0 ? (
          <p className="text-sm text-ink-muted">아직 공개된 실적 보고가 없습니다.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <ReportCard key={r.slug} report={r} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
