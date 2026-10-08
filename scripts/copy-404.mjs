// Netlify serves dist/404.html (with a 404 status) for unknown paths.
// It is the SPA shell, so React Router renders the "Open circuit" page.
import { copyFileSync } from "node:fs";

copyFileSync("dist/index.html", "dist/404.html");
console.log("dist/404.html written");
