import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import mdx from "@astrojs/mdx";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
  site: "https://podter.me",
  output: "hybrid",
  adapter: vercel({
    imageService: true,
    devImageService: "sharp",
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes("/teapot"),
    }),
    robotsTxt({
      policy: [{ allow: ["/"], disallow: ["/teapot"], userAgent: "*" }],
    }),
    mdx(),
  ],
  markdown: {
    gfm: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          test: ["h2", "h3"],
          properties: {
            "data-rehype-autolink-headings": true,
          },
        },
      ],
    ],
  },
});
