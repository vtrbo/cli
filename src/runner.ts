import { execaCommand } from 'execa'
import type { Runner } from './types'
import { interactionPrompts } from './interaction'
import { clog } from './utils'

/**
 * @description 启动器
 * @param parse 解析函数
 */
export async function runner(parse: Runner): Promise<void> {
  const args = process.argv.slice(2).filter(Boolean)
  try {
    const cwd = process.cwd()
    const command = await parse(args, cwd)
    command && await (
      command === 'interaction'
        ? interactionPrompts()
        : execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd })
    )
  }
  catch (error) {
    console.log(clog('未知错误', 'red'))
    error && console.log(error)
    process.exit(1)
  }
}
