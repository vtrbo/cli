import { execaCommand } from 'execa'
import type { Runner } from './types'
import { interactionPrompts } from './interaction'

/**
 * @description 启动器
 * @param parse 解析函数
 */
export async function runner(parse: Runner): Promise<void> {
  const args = process.argv.slice(2).filter(Boolean)
  try {
    const cwd = process.cwd()
    const command = await parse(args, cwd)
    console.log('command', command)
    command && await (
      command === 'interaction'
        ? interactionPrompts()
        : execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd })
    )
  }
  catch (error) {
    process.exit(1)
  }
}
