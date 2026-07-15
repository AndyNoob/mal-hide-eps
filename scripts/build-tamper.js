import {readFile, writeFile} from "node:fs/promises";
import { generate } from "@userscripters/generate-headers";

const tamperMonkeyHeader = await generate("tampermonkey", {
  direct: true,
  eol: "\n",
  namespace: "https://github.com/AndyNoob",
  matches: ["https://*.myanimelist.net/*"],
  packagePath: "./package.json",
  downloadURL: "https://raw.githubusercontent.com/AndyNoob/mal-hide-eps/refs/heads/main/tamper-monkey/mal-hide-eps.user.js",
  updateURL: "https://raw.githubusercontent.com/AndyNoob/mal-hide-eps/refs/heads/main/tamper-monkey/mal-hide-eps.user.js",
});

let css = await readFile("./dist/css/content.css", "utf-8");
let content = await readFile("./dist/src/content.js", "utf-8");
content = `${tamperMonkeyHeader}

(function() {
  const addStyle = (css) => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
  };
  addStyle(\`${css}\`);
})();

${content}`;
const out = `./tamper-monkey/mal-hide-eps.user.js`;
await writeFile(out, content);