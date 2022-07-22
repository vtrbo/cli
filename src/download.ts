import path from 'path'
import type { Download, InteractOptions } from './types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const download: Download = require('download-git-repo')

/**
 * 下载预设模板
 * @param options 交互式指令表单
 * @returns 成功/失败
 */
export function downloadTemplate(options: InteractOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const cwd = process.cwd()
    const { projectName, templatePath } = options
    const projectPath = path.resolve(cwd, projectName)

    download(
      templatePath,
      projectPath,
      { clone: true },
      (error: Error | undefined) => {
        if (error) {
          console.log('download template error', error)
          resolve(false)
        }
        resolve(true)
      })
  })
}
