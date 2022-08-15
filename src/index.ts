import { Command } from 'commander'
import { object } from '@vtrbo/utils'
import { name, version } from '../package.json'
import interaction from './interaction'
import imperative from './imperative'
import { clog } from './utils'

const program = new Command()

// name and usage
program
  .name(name)
  .usage('使用说明')

// version
program
  .version(`${clog(version, 'blue')}`, '-v --version', '版本信息')

// help
program
  .helpOption('-h --help', '帮助信息')
  .addHelpText('after', `
Commands Description:
  vtr [-d | --download] [origin] <owner>/<name> [filename] [branch]
  <指令> [下载] [指定来源] <拥有者>/<仓库> 至 [指定文件夹] [指定分支]
  <*> 必填
  [*] 可选
  如: vtr vtrbo/cli`,
  )

// custom options
program
  .option('-i --init', '对话式命令')
  .option('-d --download', '下载仓库')

// command parse
program
  .action((options, { args }) => {
    if (
      // options keys && args length is 0
      !((object.keys(options) || []).length || args.length)
      // options.download is true && args length is 0
      || (options.download && !args.length)
      // options.init is true
      || options.init
    ) {
      // 对话式命令
      interaction()
    }
    else {
      // 指令式命令
      imperative(args)
    }
  })

program.parse()
