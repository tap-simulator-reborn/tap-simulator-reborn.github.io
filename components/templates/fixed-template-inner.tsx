import { NativeAdSlot } from "@/components/integrations/native-ad-slot";
import { JsonLd } from "@/components/site/json-ld";
import { CopyCodes } from "@/components/site/copy-codes";
import { siteConfig } from "@/config/site";
import { siteSkin } from "@/config/skin";
import type { SeoPageDefinition } from "@/config/types";
import { enabledLegalPages, getRelatedPages, visibleCorePages } from "@/content/registry";
import { esc, renderFixedDocument } from "@/lib/fixed-template/render";
import { renderContentSections } from "@/lib/fixed-template/sections";
import { pageSchemas } from "@/lib/schema";
import { assetPath, routePath } from "@/lib/urls";

function articleInner(page:SeoPageDefinition):string {
  const quickCodes = page.slug==="codes" ? `<aside class="code-first-answer" style="border:1px solid #9db0c9;border-radius:12px;padding:14px;margin:12px 0 20px;background:#f3f7fc;color:#172b45">
  <p><b>Reported October 18, 2026 • Not independently redeemed</b></p>
  <p>Try <code>spooky</code> (reported: potions + 250 Candy Corn) or <code>BOO!</code> (reported: Luck Potion + 100 Candy Corn) in Reborn's Settings → Codes menu.</p>
  <div style="display:flex;flex-wrap:wrap;gap:12px"><button type="button" data-copy-code="spooky" style="padding:8px 14px;border:1px solid #274d8d;border-radius:8px;cursor:pointer">Copy spooky</button><button type="button" data-copy-code="BOO!" style="padding:8px 14px;border:1px solid #274d8d;border-radius:8px;cursor:pointer">Copy BOO!</button></div>
  <p style="font-size:13px">Review date: October 19, 2026 · Roblox place 72858262610964 · Source-reported, not personally verified</p>
  </aside>` : "";
  const faq=page.faq?.length ? `<section id="faq"><h2>Frequently Asked Questions</h2>${page.faq.map(q=>`<div><h3>${esc(q.question)}</h3><p>${esc(q.answer)}</p></div>`).join("")}</section>` : "";
  const related=getRelatedPages(page);
  const relatedHtml=related.length ? `<section id="related"><h2>Related Guides</h2><ul>${related.map(item=>`<li><a href="${esc(routePath(item.slug))}">${esc(item.navLabel)}</a></li>`).join("")}</ul></section>` : "";
  return `${quickCodes}<p>${esc(page.hero.lead)}</p>${renderContentSections(page.sections)}${faq}${relatedHtml}`;
}
export function FixedTemplateInner({page}:{page:SeoPageDefinition}) {
  const skin=siteSkin();
  const nav=visibleCorePages.map(item=>({slug:item.slug,label:item.navLabel,href:routePath(item.slug)}));
  const rendered=renderFixedDocument({
    skin,page:"inner",accentColorId:siteConfig.theme.accentColorId,
    gameName:siteConfig.game.name || siteConfig.shortName,nav,currentSlug:page.slug,
    homeHref:skin==="arcade-play"?assetPath("/"):"/",
    logoUrl:skin==="arcade-play"?assetPath(siteConfig.assets.logo):null,
    ...(skin==="arcade-play"?{legalLinks:enabledLegalPages.map(item=>({slug:item.slug,label:item.navLabel,href:assetPath(routePath(item.slug))}))}:{}),
    heading:page.hero.heading,lead:page.hero.lead,articleHtml:articleInner(page)
  });
  return <><JsonLd data={pageSchemas(page)}/><div dangerouslySetInnerHTML={{__html:rendered.rest}}/>{page.slug==="codes"?<CopyCodes/>:null}<div className="site-container"><NativeAdSlot/></div></>;
}
