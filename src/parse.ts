import { version } from '../package.json'
import type { Runner } from './types'

/**
 * @description 解析函数
 */
export const parse = <Runner>((args, cwd) => {
  console.log('args, cwd', args, cwd)

  if (args.length === 1 && ['-h', '--help'].includes(args[0])) {
    console.log(`
    -v --version 版本
    -d --download 下载
    `)
    process.exit(0)
  }

  if (args.length === 1 && ['-v', '--version'].includes(args[0])) {
    console.log(`@vtrbo/cli v${version}`)
    process.exit(0)
  }

  if (args.length === 1 && ['-i', '--init', 'init', 'create', 'start'].includes(args[0])) {
    console.log('问答式命令行')
    return 'interaction'
  }

  return 'ni'
})
