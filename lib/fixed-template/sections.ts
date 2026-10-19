import type { PageSection, DataTable } from "@/config/types";
import { esc } from "./render";
import { routePath } from "@/lib/urls";

function sourceParagraph(text: string): string | null {
  const match = /^SOURCE: ([^|]+) \| (https:\/\/\S+)$/.exec(text);
  if (!match) return null;
  try {
    const url = new URL(match[2]);
    if (url.protocol !== "https:") return null;
    return `<p class="guide-source"><span>Reference: </span><a href="${esc(url.href)}" target="_blank" rel="noopener noreferrer">${esc(match[1].trim())}</a></p>`;
  } catch { return null; }
}
const paragraph = (text: string) => sourceParagraph(text) ?? `<p>${esc(text)}</p>`;
function tableHtml(t: DataTable): string {
  const thead = t.columns.map(h => `<th scope="col" style="padding:10px;border:1px solid #cbd5e1;text-align:left">${esc(h)}</th>`).join("");
  const rows = t.rows.map(row => `<tr>${row.map(cell => `<td style="padding:10px;border:1px solid #cbd5e1;vertical-align:top">${esc(cell)}</td>`).join("")}</tr>`).join("");
  return `<div style="overflow-x:auto;margin:18px 0"><table style="border-collapse:collapse;width:100%;min-width:490px"><caption style="padding:8px;text-align:left;font-weight:700">${esc(t.caption)}</caption><thead><tr>${thead}</tr></thead><tbody>${rows}</tbody></table></div>`;
}
export function renderContentSections(sections: PageSection[]): string {
  return sections.map(s => {
    const sub = (s.subsections ?? []).map(u => `<div class="guide-subsection"><h3>${esc(u.heading)}</h3>${u.paragraphs.map(paragraph).join("")}${u.bullets?.length ? `<ul>${u.bullets.map(b=>`<li>${esc(b)}</li>`).join("")}</ul>` : ""}${u.table ? tableHtml(u.table) : ""}</div>`).join("");
    const steps = s.steps?.length ? `<ol>${s.steps.map(step=>`<li><h3>${esc(step.heading)}</h3><p>${esc(step.description)}</p></li>`).join("")}</ol>` : "";
    const links = s.links?.length ? `<ul class="guide-related-links">${s.links.map(l=>`<li><a href="${esc(routePath(l.slug))}">${esc(l.label)}</a>${l.description ? ` — ${esc(l.description)}` : ""}</li>`).join("")}</ul>` : "";
    return `<section id="${esc(s.id)}"><h2>${esc(s.heading)}</h2>${s.intro ? paragraph(s.intro) : ""}${(s.paragraphs ?? []).map(paragraph).join("")}${sub}${steps}${s.table ? tableHtml(s.table) : ""}${links}</section>`;
  }).join("");
}
