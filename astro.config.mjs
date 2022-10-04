import { defineConfig } from 'astro/config';
import { settings } from './src/data/settings';
import sitemap from "@astrojs/sitemap";
import lit from "@astrojs/lit";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: settings.site,
  integrations: [sitemap(), lit(), mdx()],
  vite: {
    ssr: {
      external: ["svgo"]
    }
  }
});