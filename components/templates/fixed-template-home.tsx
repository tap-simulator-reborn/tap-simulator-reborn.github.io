import { NativeAdSlot } from "@/components/integrations/native-ad-slot";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { siteConfig } from "@/config/site";
import { siteSkin } from "@/config/skin";
import type { HomePageDefinition, InternalLink } from "@/config/types";
import { visibleCorePages } from "@/content/registry";
import { renderFixedDocument } from "@/lib/fixed-template/render";
import { renderContentSections } from "@/lib/fixed-template/sections";
import { homeSchemas } from "@/lib/schema";
import { assetPath, routePath } from "@/lib/urls";

export function FixedTemplateHome({ home }: { home: HomePageDefinition }) {
  const skin = siteSkin();
  const links: InternalLink[] = visibleCorePages.map(page => ({slug:page.slug,label:page.navLabel}));
  const entries = links.map(link=>({href:routePath(link.slug),title:link.label,text:link.label}));
  const rendered = renderFixedDocument({
    skin,page:"home",accentColorId:siteConfig.theme.accentColorId,
    gameName:siteConfig.game.name || siteConfig.shortName,
    nav:links.map(link=>({slug:link.slug,label:link.label,href:routePath(link.slug)})),
    homeHref:"/",logoUrl:assetPath(siteConfig.assets.logo),bannerUrl:assetPath(siteConfig.assets.cover),
    heading:home.hero.heading,lead:home.hero.lead,entries,
    supplementHtml:`<div class="site-container" style="max-width:1050px;margin:0 auto;padding:20px 16px">
       <p style="margin:10px 0"><a href="${siteConfig.game.officialUrl}" rel="noopener noreferrer" target="_blank">Play Tap Simulator Reborn on Roblox ↗</a></p>
       ${renderContentSections(home.sections)}
     </div>`
  });
  return <><JsonLd data={homeSchemas(home)}/><div dangerouslySetInnerHTML={{__html:rendered.rest}}/><div className="site-container"><NativeAdSlot/></div>{home.faq.length?<div className="site-container"><Faq items={home.faq}/></div>:null}</>;
}
