import { build, emptyDir } from "dnt"

await emptyDir("./dist")

await build({
  entryPoints: ["./src/mikanui/mod.ts", "./src/lite/mod.ts"],
  outDir: "./dist",
  shims: {},
  package: {
    name: "mikanui",
    version: Deno.args[0],
    description: "MikanUI🍊 is a library of Tailwind CSS like Material Design 3.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/nakasyou/MikanUI.git",
    },
    bugs: {
      url: "https://github.com/nakasyou/MikanUI/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "dist/LICENSE");
    Deno.copyFileSync("README.md", "dist/README.md");
  },
  filterDiagnostic(diagnostic) {
    return false
  }
});
