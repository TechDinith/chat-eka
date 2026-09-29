import { useSeo } from "../hooks";
import PageShell from "./PageShell";
import { pages, type PageContent } from "../content/pages";

export default function ContentPage({ slug }: { slug: string }) {
  const page: PageContent | undefined = pages[slug];
  useSeo({ title: page?.seoTitle ?? "Chat Eka", description: page?.seoDescription ?? "" });

  if (!page) return null;

  return (
    <PageShell>
      <article>
        <h1 className="text-3xl font-bold text-white">{page.h1}</h1>
        <p className="text-sm font-semibold text-white/40 mt-1">{page.h1En}</p>

        <div className="mt-6 space-y-2 text-sm leading-relaxed">
          <p className="text-white/70">{page.intro}</p>
          <p className="text-white/50">{page.introEn}</p>
        </div>

        {page.sections.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="text-lg font-semibold text-white">
              {s.heading}
              {s.headingEn && (
                <span className="block text-sm font-normal text-white/40 mt-0.5">
                  {s.headingEn}
                </span>
              )}
            </h2>
            <div className="mt-2.5 space-y-2.5 text-sm leading-relaxed">
              {s.body.map((p) => (
                <p key={p} className="text-white/70">
                  {p}
                </p>
              ))}
              {s.bodyEn?.map((p) => (
                <p key={p} className="text-white/50">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        <p className="text-xs text-white/30 mt-10">Last updated: {page.updated}</p>
      </article>
    </PageShell>
  );
}
