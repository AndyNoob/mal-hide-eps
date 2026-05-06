import {defineConfig} from 'vite';
import webExtension from "vite-plugin-web-extension";
import zipPack from "vite-plugin-zip-pack";
import pkg from "./package.json";
import AdmZip from "adm-zip";

const browserType = process.env["BROWSER"] ?? "firefox";
console.log(`compiling for ${browserType}`);

export default defineConfig({
  // publicDir: "icons",
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false
  },
  define: {
    __BROWSER_TYPE__: JSON.stringify(browserType)
  },
  plugins: [
    webExtension({
      browser: browserType,
      manifest: makeManifest
    }),
    zipPack({
      outFileName: `${pkg.name}-${browserType}.zip`,
      done: () => {
        if (browserType === "chrome") {
          const zip = new AdmZip(`./dist-zip/${pkg.name}-chrome.zip`);
          zip.extractAllTo(`./dist-zip/${pkg.name}-crhome-unzipped`, true);
          console.log('chrome extraction complete!');
        }
      }
    })
  ]
});

function makeManifest() {
  return {
    manifest_version: 3,
    name: pkg.displayName,
    version: pkg.version,
    description: pkg.description,
    // icons: {
    //   "32": "icon-32.png",
    //   "64": "icon-64.png",
    //   "128": "icon-128.png"
    // },
    host_permissions: ["*://*.myanimelist.net/*"],
    content_scripts: [
      {
        js: ["src/content.js"],
        matches: ["*://*.myanimelist.net/*"],
        run_at: "document_idle"
      },{
        css: ["css/content.css"],
        matches: ["*://*.myanimelist.net/*"],
        run_at: "document_start"
      }
    ],
    browser_specific_settings: {
      gecko: {
        id: "mal-hide-eps@andynoob",
        data_collection_permissions: {
          required: ["none"]
        }
      }
    }
  }
}
