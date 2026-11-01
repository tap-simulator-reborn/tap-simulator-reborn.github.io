"use client";

import { useEffect } from "react";

const SOCIAL_SCRIPT = "https://bauval.org/14/64d50e5291ba77da08520a0d5d46ebc5";

export function SocialBar() {
  useEffect(() => {
    // RootLayout persists across Next.js client navigations. Also guard Strict
    // Mode mounts: never remove and re-execute the provider's document script.
    if (document.querySelector("script[data-adsterra-social-bar]")) return;
    const script = document.createElement("script");
    script.src = SOCIAL_SCRIPT;
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-adsterra-social-bar", "true");
    document.body.appendChild(script);
  }, []);

  return null;
}
