import * as fs from 'fs/promises'

export const existsPath = async (path: string): Promise<boolean> => {
  try {
    await fs.stat(path)
    return true
  } catch {
    return false
  }
}

export const isDir = async (path: string): Promise<boolean> => {
  try {
    return (await fs.stat(path)).isDirectory()
  } catch {
    return false
  }
}

const removePath = async  (dirPath: string): Promise<void> => {
  const dirEntries = await fs.readdir(dirPath);
  for (const entry of dirEntries) {
    const entryPath = `${dirPath}/${entry}`;
    const stats = await fs.lstat(entryPath);

    if (stats.isDirectory()) {
      // ディレクトリの場合、再帰的に削除
      await removePath(entryPath);
      await fs.rmdir(entryPath);
    } else {
      // ファイルの場合、削除
      await fs.unlink(entryPath);
    }
  }
}

export const emptyDir = async (targetPath: string) => {
  if (await existsPath(targetPath)) {
    removePath(targetPath)
  } else {
    await fs.mkdir(targetPath)
  }
}
