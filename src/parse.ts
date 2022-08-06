// import ora from 'ora'
import { version } from '../package.json'
import { downloadCommand } from './download'
import type { Runner } from './types'
import { clog } from './utils'

/**
 * @description 解析函数
 */
export const parse = <Runner>((args: string[]) => {
  // vtr -v
  if (args.length === 1 && !args[0].replace(/\\/g, '/').includes('/'))
    return singleArgs(args)

  // vtr -d github vtrbo/cli cli main
  if (['-d', '--download'].includes(args[0]) && (args[1].replace(/\\/g, '/').includes('/') || ['github'].includes(args[1])))
    return downloadRepository(args)

  // vtr vtrbo/cli
  if (args.length === 1 && args[0].replace(/\\/g, '/').includes('/'))
    return `vtr -d github ${args[0]} ${args[1]} ${args[2]}`

  // vtr vtrbo/cli cli main
  if (args.length >= 2 && args[0].replace(/\\/g, '/').includes('/'))
    return `vtr -d github ${args[0]} ${args[1]} ${args[2]}`

  // vtr github vtrbo/cli cli main
  if (args.length >= 2 && ['github', 'gitee', 'gitlab', 'bitbucket'].includes(args[0]) && args[1].replace(/\\/g, '/').includes('/'))
    return `vtr -d ${args[0]} ${args[1]} ${args[2]} ${args[3]}`

  // not command
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
  console.log(clog('帮助信息(不支持私有仓库的下载)', 'yellow'))
  console.log(clog('指令式', 'blue'))
  console.log('-h --help', '                             帮助信息')
  console.log('-v --version', '                          版本信息')
  console.log('-d --download', '                         下载仓库')
  console.log('-i --init init create start', '           对话式命令\n')
  console.log(clog('指令式例子', 'blue'))
  console.log('vtr -i')
  console.log('vtr start')
  console.log('...\n')
  console.log(clog('命令式', 'blue'))
  console.log('vtr <-d | --download> <origin> owner/name <filename> <branch>')
  console.log('下载<指定来源><指定>仓库<指定分支>至<指定>文件夹')
  console.log('<*>为可省略参数\n')
  console.log(clog('命令式例子', 'blue'))
  console.log('vtr vtrbo/cli')
  console.log('vtr vtrbo/cli cli')
  console.log('vtr github vtrbo/cli cli')
  console.log('...')
  process.exit(0)
}

/**
 * @description 版本信息
 */
function commandVersion() {
  console.log(clog(`v${version}`, 'blue'))
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
  // const oraInstance = ora(clog('download repository ing...\n', 'blue')).start()
  console.log(clog('download repository ing...', 'blue'))

  let downloadResult = true
  downloadResult = await downloadCommand(args.slice(1))

  // downloadResult
  //   ? oraInstance.succeed(clog('download repository success', 'green'))
  //   : oraInstance.fail(clog('download repository fail', 'red'))

  downloadResult
    ? console.log(clog('download repository success', 'green'))
    : console.log(clog('download repository fail', 'red'))

  process.exit(0)
}
