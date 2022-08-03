import ora from 'ora'
import { version } from '../package.json'
import { downloadCommand } from './download'
import type { Runner } from './types'

/**
 * @description 解析函数
 */
export const parse = <Runner>((args: string[], cwd: string) => {
  console.log('args, cwd', args, cwd)

  if (args.length === 1)
    return singleArgs(args)

  if (['-d', '--download'].includes(args[0]))
    downloadRepository(args)

  if (args.length >= 2 && args[0].replace(/\\/g, '/').includes('/'))
    return `vtr -d github ${args[0]} ${args[1]} ${args[2]}`

  if (args.length === 3)
    return 'ni'

  return 'vtr -i'
})

/**
 * @description 单个参数的处理函数
 * @param args 参数
 */
function singleArgs(args: string[]): string | void {
  const strategy: {
    [key: string]: () => string | void
  } = {
    '-h': commandHelp,
    '--help': commandHelp,
    '-v': commandVersion,
    '--version': commandVersion,
    '-i': commandInteraction,
    '--init': commandInteraction,
    'init': commandInteraction,
    'create': commandInteraction,
    'start': commandInteraction,
  }
  return strategy[args[0]]()
}

/**
 * @description 帮助信息
 */
function commandHelp() {
  console.log('帮助信息')
  process.exit(0)
}

/**
 * @description 版本信息
 */
function commandVersion() {
  console.log(`@vtrbo/cli v${version}`)
  process.exit(0)
}

/**
 * @description 问答式命令行
 */
function commandInteraction(): string {
  return 'interaction'
}

/**
 * @description 下载仓库
 * @param args 下载参数
 */
async function downloadRepository(args: string[]) {
  console.log('args', args)
  const oraInstance = ora('download repository ing...\n').start()
  let downloadResult = true
  downloadResult = await downloadCommand(args.slice(1))

  downloadResult
    ? oraInstance.succeed('download repository success')
    : oraInstance.fail('download repository fail')

  process.exit(0)
}
