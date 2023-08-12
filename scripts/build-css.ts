import * as fs from 'std/fs/mod.ts'
import postcss from 'npm:postcss'
import postcssJs from 'npm:postcss-js'

const cssObjects = []

for await (const entry of fs.expandGlob('./css/**/*.css')) {
  const css  = await Deno.readTextFile(entry.path)
  const root = postcss.parse(css)
  
  cssObjects.push(postcssJs.objectify(root))
}

const code = `export default () => ${JSON.stringify(Object.assign(...cssObjects))}`

await Deno.writeTextFile('src/material-components.ts', code)
