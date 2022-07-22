import path from 'path'
import type { DownloadError } from 'download-git-repo'
import download from 'download-git-repo'
import type { InteractOptions } from './types'

/**
 * @description 下载预设模板
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
      (error: DownloadError) => {
        if (error) {
          console.log('download template error', error)
          resolve(false)
        }
        resolve(true)
      })
  })
}
