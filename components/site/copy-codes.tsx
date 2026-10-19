"use client";
import { useEffect } from "react";
export function CopyCodes() {
  useEffect(() => {
    const handle=async(event:MouseEvent) => {
      const element=event.target;
      if (!(element instanceof Element)) return;
      const button=element.closest<HTMLButtonElement>("button[data-copy-code]");
      if (!button) return;
      const value=button.dataset.copyCode;
      if (!value) return;
      const original=button.textContent || "Copy";
      try {
        await navigator.clipboard.writeText(value);
        button.textContent="Copied: " + value;
      } catch {
        button.textContent="Select and copy: " + value;
      }
      button.setAttribute("aria-label",button.textContent || original);
    };
    document.addEventListener("click",handle);
    return () => document.removeEventListener("click",handle);
  },[]);
  return null;
}
