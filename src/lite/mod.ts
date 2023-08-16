import { mikanUI } from "../mikanui/mod.ts"

type TailwindedWindow = Window & {
  tailwind?: {
    config?: {
      plugins?: any[]
    }
  }
}
if (!((window as TailwindedWindow).tailwind)) {
  (window as TailwindedWindow).tailwind = {}
}
const tailwind = (window as TailwindedWindow).tailwind!

if (!tailwind.config) {
  tailwind.config = {}
}

if (!tailwind.config!.plugins){
  tailwind.config!.plugins = []
}
// @ts-ignore Window
window.mikanUI = mikanUI
tailwind.config!.plugins.push(mikanUI({
  seedColor: "#f00"
}))
