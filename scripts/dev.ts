import { watch } from "fs/promises";
import { oneBuild } from "./one-build";

const watcher = watch('./src/', { recursive: true })

for await (const event of watcher) {
  console.log('Event')
  await oneBuild()
}
