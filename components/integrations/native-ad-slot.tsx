import { integrations } from "@/config/integrations";
import { NativeAdClient } from "./native-ad-client";

export function NativeAdSlot() {
  if (integrations.ads.provider !== "adsterra-native") return null;

  return (
    <div className="adsterra-native" aria-label="Sponsored advertisement">
      <p className="adsterra-ad-label">Advertisement · Sponsored</p>
      <NativeAdClient
        scriptUrl={integrations.ads.scriptUrl}
        containerId={integrations.ads.containerId}
      />
    </div>
  );
}
