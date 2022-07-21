import { version } from '../package.json'
import type { TRun } from './types'

export const parseVtr = <TRun>((args, ctx) => {
  console.log('args, ctx', args, ctx)

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

  if (args.length === 1 && ['-i', '--init', 'init', 'start'].includes(args[0])) {
    console.log('命令行交互方式', '命令行交互方式')
    return 'cli'
  }

  return 'ni'
})
