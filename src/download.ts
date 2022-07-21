import path from 'path'

type Download = (repo: string, dest: string, opts: object, fn: Function) => void

// eslint-disable-next-line @typescript-eslint/no-var-requires
const download: Download = require('download-git-repo')

export interface IInteract {
  projectName: string
  templateName: string
  templatePath: string
}

export function template(interact: IInteract): Promise<boolean> {
  return new Promise((resolve) => {
    console.log('interact', interact)
    const { projectName, templatePath } = interact
    const cwd = process.cwd()
    const projectPath = path.resolve(cwd, projectName)
    download(templatePath, projectPath, {}, (error: Error | undefined) => {
      if (error) {
        console.log('download template error', error)
        resolve(false)
      }
      resolve(true)
    })
  })
}
