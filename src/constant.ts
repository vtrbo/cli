import type { Choice, PromptObject } from 'prompts'
import type { Template } from './types'

/**
 * @description 预设模板
 */
export const TEMPLATES: Template[] = [
  {
    title: 'VS Code Extension',
    value: 'VS Code Extension',
    path: 'github:vtrbo/starter-vscode#main',
    description: 'Victor Bo\'s VS Code Extension Template.',
  },
  {
    title: 'TypeScript Library',
    value: 'TypeScript Library',
    path: 'github:vtrbo/starter-library#main',
    description: 'Victor Bo\'s TypeScript Library Template.',
  },
  {
    title: 'Unplugin',
    value: 'Unplugin',
    path: 'github:vtrbo/starter-unplugin#main',
    description: 'Victor Bo\'s Unplugin Template.',
  },
]

/**
 * @description 交互式指令
 */
export const REMINDERS: PromptObject[] = [
  {
    type: 'select',
    name: 'templateName',
    message: 'Pick template',
    choices: TEMPLATES as Choice[],
  },
  {
    type: 'text',
    name: 'projectBranch',
    message: 'Keyup branch',
  },
  {
    type: 'text',
    name: 'projectName',
    message: 'Keyup filename',
  },
]
