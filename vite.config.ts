import { defineConfig } from 'vite';

// The hosted directory site for rulesets.apicommons.org.
// Entry is the repo-root index.html; the browsable directory is driven at
// runtime by public/rulesets.json (also served as open data at
// /rulesets.json). Output goes to dist/, which the Pages workflow uploads.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
  },
});
