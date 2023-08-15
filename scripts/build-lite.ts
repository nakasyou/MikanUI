import * as esbuild from "esbuild"
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.1/mod.ts";

export async function build () {
  await esbuild.build({
    entryPoints: ["./src/lite/mod.ts"],
    outfile: "dist_lite/index.js",
    bundle: true,
    plugins: [
      {
        name: "esm sh",
        setup(build) {
          build.onResolve({ filter: /^npm:.+$/ }, args => ({
            path: "//esm.sh/" + args.path.replace("npm:", ""),
            namespace: 'https',
          }))
        }
      },
      ...denoPlugins()
    ]
  })
  esbuild.stop()
}
if (import.meta.main) {
  await build()
}
