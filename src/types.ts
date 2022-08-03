import type { Choice } from 'prompts'

export type Runner = (args: string[], cwd?: string) => Promise<string | undefined> | string | undefined

export interface Template extends Choice {
  path?: string
}

export interface InteractOptions {
  projectName: string
  projectBranch: string
  templateName: string
  templatePath: string
}
