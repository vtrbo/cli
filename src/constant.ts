import type { Choice, PromptObject } from 'prompts'

export interface ITemplate extends Choice {
  path?: string
}

/**
 * 模板仓库列表
 */
export const templates: ITemplate[] = [
  {
    title: 'VS Code',
    value: 'VS Code',
    path: 'git@github.com:vtrbo/cli.git',
    description: 'Starter template for VS Code Extension',
  },
  {
    title: 'TS Lib',
    value: 'TS Lib',
    path: 'https://github.com/vtrbo/ts-lib',
    description: 'Starter template for TypeScript library',
  },
]

/**
 * 交互式指令集
 */
export const reminders: PromptObject[] = [
  {
    type: 'select',
    name: 'templateName',
    message: 'Pick a template',
    choices: templates as Choice[],
  },
  {
    type: 'text',
    name: 'projectName',
    message: 'Keyup a project name',
  },
]

