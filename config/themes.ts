import type { ThemeConfig, ThemePresetName } from "./types";

export const themes: Record<string, ThemeConfig> = {
  "obsidian-red": {
    name: "obsidian-red" as ThemePresetName,
    label: "Site Theme",
    description: "Selected site theme",
    tokens: {
  "background": "216 33% 97%",
  "foreground": "0 0% 7%",
  "card": "216 33% 93%",
  "card-foreground": "0 0% 7%",
  "primary": "218 57% 35%",
  "primary-foreground": "0 0% 100%",
  "secondary": "216 33% 90%",
  "muted": "216 33% 92%",
  "muted-foreground": "0 0% 7%",
  "border": "216 33% 81%",
  "radius": ".75rem",
  "card-shadow": "0 18px 50px rgba(20, 20, 30, .1)",
  "hero-gradient": "radial-gradient(circle at 78% 14%, hsl(218 57% 35% / .2), transparent 36%)",
  "background-pattern": "linear-gradient(hsl(0 0% 7% / .04) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 7% / .04) 1px, transparent 1px)",
  "font-sans": "\"Source Sans 3\", ui-sans-serif, system-ui, sans-serif",
  "font-heading": "\"Source Sans 3\", ui-sans-serif, system-ui, sans-serif",
  "heading-weight": "700",
  "heading-letter-spacing": "-0.02em"
},
  },
};
