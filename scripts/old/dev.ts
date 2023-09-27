import { build as buildCss } from "./build-css.ts"
import { build as buildLite } from "./build-lite.ts"

import { Hono } from "hono"
import { serveStatic } from "hono/middleware"

const app = new Hono()

;(async () => {
  const watcher = Deno.watchFs("./css");
  for await (const event of watcher) {

    await buildCss()
    await buildLite()
    console.log("builded")
  }
})()


app.get("/mikanui.js", async (c) => {
  c.header("content-type", "text/javascript")
  return c.text(await Deno.readTextFile("dist_lite/index.js"))
})
app.get("/*", serveStatic({
  root: "./"
}))

Deno.serve(app.fetch)
