"use client";

import { useEffect, useRef } from "react";

export function NativeAdClient({ scriptUrl, containerId }: { scriptUrl: string; containerId: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // The container must exist before the provider script starts executing.
    const container = document.createElement("div");
    container.id = containerId;
    host.appendChild(container);

    // Delay only initial insertion by one task to prevent React dev Strict
    // Mode's setup/cleanup cycle from issuing an obsolete extra request.
    // There is no timeout that kills an ad while it is loading.
    const timer = window.setTimeout(() => {
      if (!host.isConnected) return;
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptUrl;
      script.setAttribute("data-cfasync", "false");
      script.dataset.gameWikiNativeAd = containerId;
      host.insertBefore(script, container);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      host.replaceChildren();
    };
  }, [containerId, scriptUrl]);

  return <div ref={hostRef} data-native-ad-slot />;
}
