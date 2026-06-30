// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { siteConfig } from "./src/config/site";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Doto",
        cssVariable: "--font-main",
        weights: [400, 500, 700],
        styles: ["normal"],
        subsets: ["latin"],
        display: "swap",
      },
      {
        provider: fontProviders.google(),
        name: "JetBrains Mono",
        cssVariable: "--font-body",
        weights: [300, 400, 500],
        styles: ["normal"],
        subsets: ["latin"],
        display: "swap",
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({
      customPages: ["https://heygaia.io"],
    }),
  ],
});
