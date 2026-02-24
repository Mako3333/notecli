#!/usr/bin/env node
/**
 * bundle.cjs
 *
 * esbuild JS API でバンドルする。CLIバージョンをビルド時に埋め込む。
 * CJS形式で出力し node_modules への依存なく動作する自己完結バイナリを生成する。
 */
const esbuild = require("esbuild");
const path = require("path");
const pkg = require("../package.json");

const CLI_DIR = path.resolve(__dirname, "..");

esbuild
  .build({
    entryPoints: [path.join(CLI_DIR, "src/main.ts")],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    outfile: path.join(CLI_DIR, "dist/main.cjs"),
    external: ["playwright"],
    define: {
      CLI_VERSION: JSON.stringify(pkg.version),
    },
    absWorkingDir: CLI_DIR,
  })
  .then(() => {
    console.log(`[bundle] dist/main.cjs (${pkg.version})`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
