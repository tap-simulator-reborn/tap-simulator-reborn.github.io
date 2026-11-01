"use client";

import { useEffect, useState } from "react";

// Each banner executes inside an isolated document because the provider may
// use document.write. This prevents late script execution from wiping Next.js.
// The original GET CODE is preserved, including atOptions and the script src.
const banners = {
  "desktop": {
    "width": 728,
    "height": 90,
    "code": "<script>\n  atOptions = {\n    'key' : 'f629fd6b5b3e1f6522d0bccb1afae6c1',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/f629fd6b5b3e1f6522d0bccb1afae6c1\"></script>"
  },
  "mobile": {
    "width": 320,
    "height": 50,
    "code": "<script>\n  atOptions = {\n    'key' : '055233394bf24b26d73f20770d9e68fe',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/055233394bf24b26d73f20770d9e68fe\"></script>"
  }
} as const;
type Device = keyof typeof banners;

export function ResponsiveBanner() {
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setDevice(media.matches ? "desktop" : "mobile");
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const banner = device ? banners[device] : null;

  return (
    <div className="adsterra-banner" aria-label="Advertisement">
      <p className="adsterra-ad-label">Advertisement</p>
      <div className="adsterra-banner-frame">
        {banner ? (
          <iframe
            key={device}
            title="Advertisement"
            width={banner.width}
            height={banner.height}
            scrolling="no"
            referrerPolicy="strict-origin-when-cross-origin"
            srcDoc={`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;overflow:hidden;">${banner.code}</body></html>`}
          />
        ) : null}
      </div>
    </div>
  );
}
