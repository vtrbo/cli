import { version } from '../package.json'
import type { Runner } from './types'

/**
 * @description 解析函数
 */
export const parse = <Runner>((args, cwd) => {
  console.log('args, cwd', args, cwd)

  if (args.length === 1)
    return singleArgs(args)

  return 'ni'
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
