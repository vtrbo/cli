import type { Choice, PromptObject } from 'prompts'
import type { Template } from './types'

/**
 * @description 预设模板
 */
export const TEMPLATES: Template[] = [
  {
    title: 'VS Code',
    value: 'VS Code',
    path: 'github:vtrbo/cli#main',
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
 * @description 交互式指令
 */
export const REMINDERS: PromptObject[] = [
  {
    type: 'select',
    name: 'templateName',
    message: 'Pick a template',
    choices: TEMPLATES as Choice[],
  },
  {
    type: 'text',
    name: 'projectName',
    message: 'Keyup a filename',
  },
]
