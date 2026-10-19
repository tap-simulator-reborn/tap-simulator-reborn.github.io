import Link from "next/link";
import type { PageSection } from "@/config/types";
import { routePath } from "@/lib/urls";
import { DataTable } from "./data-table";

function SourceParagraph({ text }: { text: string }) {
  const match = /^SOURCE: ([^|]+) [|] (https:\/\/[^\s]+)$/.exec(text);
  if (!match) return <p>{text}</p>;
  const safeLink = URL.canParse(match[2]) ? new URL(match[2]) : null;
  if (!safeLink || safeLink.protocol !== "https:") return <p>{text}</p>;
  return <p className="wiki-source"><span>Reference: </span><a href={safeLink.href} rel="noopener noreferrer" target="_blank">{match[1].trim()}</a></p>;
}


export function WikiPageSections({ sections }: { sections: PageSection[] }) {
  return (
    <div className="wiki-page-sections">
      {sections.map((section) => (
        <section id={section.id} key={section.id} className="scroll-mt-24">
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          <h2>{section.heading}</h2>
          {section.intro ? <p className="section-lead">{section.intro}</p> : null}
          {section.paragraphs?.map((paragraph) => <SourceParagraph key={paragraph} text={paragraph} />)}

          {section.subsections?.length ? (
            <div className="wiki-subsections">
              {section.subsections.map((subsection) => (
                <article key={subsection.heading} className="wiki-block">
                  <h3>{subsection.heading}</h3>
                  {subsection.paragraphs.map((paragraph) => <SourceParagraph key={paragraph} text={paragraph} />)}
                  {subsection.bullets?.length ? (
                    <ul className="wiki-bullets">
                      {subsection.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  ) : null}
                  {subsection.table ? <DataTable table={subsection.table} /> : null}
                </article>
              ))}
            </div>
          ) : null}

          {section.steps?.length ? (
            <ol className="wiki-steps">
              {section.steps.map((step, index) => (
                <li key={step.heading} className="wiki-step">
                  <span className="wiki-step-index">{index + 1}</span>
                  <div>
                    <h3>{step.heading}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}

          {section.table ? <DataTable table={section.table} /> : null}

          {section.links?.length ? (
            <ul className="wiki-link-list">
              {section.links.map((link) => (
                <li key={`${link.slug}-${link.label}`}>
                  <Link href={routePath(link.slug)}>
                    <strong>{link.label}</strong>
                    {link.description ? <span>{link.description}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
