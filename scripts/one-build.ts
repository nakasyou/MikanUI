import fg from "fast-glob"
import { readFile, writeFile } from "fs/promises"
import postcss from "postcss"
import postcssJs from "postcss-js"
import { emptyDir } from "./utils/fs"
import postcssNested from "postcss-nested"
import { kebabToCamel } from "../src/utils/string-caces"

const applyCssApplyRule = (cssInJs: postcssJs.CssInJs, all?: postcssJs.CssInJs) => {
  if (!all) {
    all = cssInJs
  }
  for (const [key, value] of Object.entries(cssInJs)) {
    if (['string', 'boolean'].includes(typeof value)) {
      if (key.slice(0, 6) === '@apply') {
        const applyClasses = key.slice(7).split(' ')
        for (const applyClass of applyClasses) {
          const applyTarget: postcssJs.CssInJs | undefined = all['.' + applyClass]
          if (applyTarget) {
            Object.assign(cssInJs, applyTarget)
          }
          delete cssInJs[key]
        }
      }
    } else {
      applyCssApplyRule(value, all)
    }
  }
  return cssInJs
}
export const oneBuild = async () => {
  await emptyDir('./tmp_mikanui')
  // CSS Bundle
  const cssFiles = await fg.glob(['./src/rules/**/*.css'], { dot: true })
  const cssText = (await Promise.all(cssFiles.map(async (cssFile) => {
    return await readFile(cssFile, {
      encoding: 'utf8'
    })
  }))).join('\n')
  const prefixedCss = await postcss([ postcssNested ])
    // @ts-expect-error optsの使い方わからない
    .process(cssText)
    .then(result => result.css)
  const cssObject = applyCssApplyRule(postcssJs.objectify(postcss.parse(prefixedCss)))

  //const cssObject = postcssJs.objectify(postcss.parse(cssText))
  const forClassNameRules: string[] = []
  for (const [className, rule] of Object.entries(cssObject)) {
    const canJsVarNameClassName = kebabToCamel(className.replace('.', '')).replaceAll(':', '_')
    forClassNameRules.push(`export const ${canJsVarNameClassName} = ${JSON.stringify(rule, null, 2)}` )
  }
  
  await writeFile('./tmp_mikanui/css.ts', `
export const rawCssInJs = ${JSON.stringify(cssObject, null, 2)}
${forClassNameRules.join('\n')}
  `.slice(1, -1))
  console.log()
}

if (import.meta.main) {
  await oneBuild()
}