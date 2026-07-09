import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAll, getOne, renderMarkdown } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAll("reports").map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const report = getOne("reports", slug);
  if (!report || report.draft) return {};
  return { title: report.title, description: report.description };
}

export default async function ReportPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const report = getOne("reports", slug);
  if (!report || report.draft) notFound();
  const html = await renderMarkdown(report.content);
  return (
    <article className="reading py-20">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-xs">
          {report.period && (
            <span className="rounded-ui bg-primary px-2 py-0.5 font-bold text-card">{report.period}</span>
          )}
          <time className="text-ink-muted">{report.date}</time>
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold leading-snug text-primary sm:text-4xl">{report.title}</h1>
        <p className="mt-4 text-lg text-ink-sub">{report.description}</p>
      </header>
      {/* 7.5 BI 대시보드 임베드 슬롯: 리포트 본문에 <iframe> 대시보드를 넣을 자리 */}
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
