import type { Choice } from 'prompts'

export type Runner = (args: string[], cwd?: string) => Promise<string | undefined> | string | undefined

export type Download = (repo: string, dest: string, opts: object, fn: Function) => void

export interface Template extends Choice {
  path?: string
}

export interface InteractOptions {
  projectName: string
  templateName: string
  templatePath: string
}
