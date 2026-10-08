import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/*
  /writing is a separate Netlify site, proxied in production by
  public/_redirects. Mirror that locally so blog links work in
  `npm run dev` and `npm run preview` instead of hitting the SPA 404.
*/
const writingProxy = {
  "/writing": {
    target: "https://ntlaks-writing.netlify.app",
    changeOrigin: true,
    autoRewrite: true,
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: writingProxy },
  preview: { proxy: writingProxy },
});
