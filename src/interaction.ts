import ora from 'ora'
import inquirer from 'inquirer'
import { downloadRepository } from './download'
import { clog } from './utils'

interface IAnswer {
  tRepo: string
  tBranch: string
  tFileName: string
  cOrigin: string
  cOwner: string
  cRepo: string
  cBranch: string
  cFileName: string
}

const TEMPLATES = [
  { name: 'NpmLibrary', value: 'starter-library' },
  { name: 'Vitepress', value: 'starter-vitepress' },
  { name: 'SvelteKit', value: 'starter-svelte-kit' },
  { name: 'Unplugin', value: 'starter-unplugin' },
  { name: 'VitePlugin', value: 'starter-vite-plugin' },
  { name: 'VSCode', value: 'starter-vscode' },
  { name: 'Custom', value: 'custom' },
]

const REMINDERS = [
  // 首次问话
  {
    type: 'list',
    name: 'tRepo',
    message: 'Pick template',
    default: 0,
    choices: TEMPLATES,
  },

  // 模板预设问话
  {
    type: 'input',
    name: 'tBranch',
    message: 'Keyup branch',
    default: 'main',
    when(answer: IAnswer) {
      return answer.tRepo !== 'custom'
    },
  },
  {
    type: 'input',
    name: 'tFileName',
    message: 'Keyup filename',
    default(answer: IAnswer) {
      return answer.tRepo
    },
    when(answer: IAnswer) {
      return answer.tRepo !== 'custom'
    },
  },

  // 自定义问话
  {
    type: 'input',
    name: 'cOrigin',
    message: 'Keyup origin',
    default: 'github',
    when(answer: IAnswer) {
      return answer.tRepo === 'custom'
    },
    validate(input: string) {
      return !!input
    },
  },
  {
    type: 'input',
    name: 'cOwner',
    message: 'Keyup owner',
    default: 'vtrbo',
    when(answer: IAnswer) {
      return answer.tRepo === 'custom'
    },
    validate(input: string) {
      return !!input
    },
  },
  {
    type: 'input',
    name: 'cRepo',
    message: 'Keyup repo name',
    when(answer: IAnswer) {
      return answer.tRepo === 'custom'
    },
    validate(input: string) {
      return !!input
    },
  },
  {
    type: 'input',
    name: 'cBranch',
    message: 'Keyup repo branch',
    when(answer: IAnswer) {
      return answer.tRepo === 'custom'
    },
  },
  {
    type: 'input',
    name: 'cFileName',
    message: 'Keyup filename',
    default(answer: IAnswer) {
      return answer.cRepo
    },
    when(answer: IAnswer) {
      return answer.tRepo === 'custom'
    },
  },
]

export default async function interaction(): Promise<void> {
  const answers = await inquirer.prompt(REMINDERS)

  if (['custom'].includes(answers.tRepo)) {
    // 自定义下载
    const repoUrl = `${answers.cOrigin}:${answers.cOwner}/${answers.cRepo}${answers.cBranch ? `#${answers.cBranch}` : ''}`

    const oraInstance = ora(clog('download repository ing...', 'blue')).start()

    let downloadResult = true
    downloadResult = await downloadRepository(repoUrl, answers.cFileName)

    downloadResult
      ? oraInstance.succeed(clog('download repository success', 'green'))
      : oraInstance.fail(clog('download repository fail', 'red'))
  }
  else {
    // 模板下载
    const repoUrl = `github:vtrbo/${answers.tRepo}#${answers.tBranch}`

    const oraInstance = ora(clog('download repository ing...', 'blue')).start()

    let downloadResult = true
    downloadResult = await downloadRepository(repoUrl, answers.tFileName)

    downloadResult
      ? oraInstance.succeed(clog('download repository success', 'green'))
      : oraInstance.fail(clog('download repository fail', 'red'))
  }
}
