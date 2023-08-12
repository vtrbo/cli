import path from 'node:path'
import process from 'node:process'
import { loadRepo } from 'load-repo'

export function downloadRepository(repoUrl: string, fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    const cwd = process.cwd()
    const dirPath = path.resolve(cwd, fileName)

    loadRepo(
      repoUrl,
      dirPath,
      { clone: false },
      (error?: Error) => {
        if (error)
          resolve(false)
        resolve(true)
      })
  })
}
