import path from 'path'
import fs from 'fs'
import type { DownloadError } from 'download-git-repo'
import download from 'download-git-repo'
import type { InteractOptions } from './types'
import { throwError } from './utils'

/**
 * @description 下载预设模板
 * @param options 交互式指令表单
 * @returns 成功/失败
 */
export function downloadTemplate(options: InteractOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const cwd = process.cwd()
    let { projectName, templatePath } = options
    const { projectBranch } = options

    if (!projectName)
      projectName = templatePath.replace(/^(.*?)\/(.*?)#(.*?)$/g, '$2')

    if (projectBranch)
      templatePath = templatePath.replace(/^(.*?)#(.*?)$/g, `$1#${projectBranch}`)

    const projectPath = path.resolve(cwd, projectName)

    if (fs.existsSync(projectPath))
      throwError(`已存在${projectName}，请删除后重试`)

    console.log('templatePath', templatePath)
    console.log('projectPath', projectPath)

    download(
      templatePath,
      projectPath,
      { clone: true },
      (error: DownloadError) => {
        if (error) {
          console.log('download template error\n', error)
          resolve(false)
        }
        resolve(true)
      })
  })
}

/**
 * @description 指令下载仓库
 * @param args 参数
 * @returns 成功/失败
 */
export function downloadCommand(args: string[]): Promise<boolean> {
  return new Promise((resolve) => {
    const [type, repository, projectName, branch] = args
    const cwd = process.cwd()
    const templatePath = `${type}:${repository}${branch !== 'undefined' ? `#${branch}` : ''}`
    const projectPath = path.resolve(cwd, projectName)

    if (fs.existsSync(projectPath))
      throwError(`已存在${projectName}，请删除后重试`)

    console.log('templatePath', templatePath)
    console.log('projectPath', projectPath)

    download(
      templatePath,
      projectPath,
      { clone: true },
      (error: DownloadError) => {
        if (error) {
          console.log('download repository error\n', error)
          resolve(false)
        }
        resolve(true)
      })
  })
}
