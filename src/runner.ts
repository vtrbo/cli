import { execaCommand } from 'execa'
import { interactEntry } from './interact'
import type { TRun } from './types'

export async function runCli(fn: TRun, options = {}) {
  const args = process.argv.slice(2).filter(Boolean)
  try {
    await run(fn, args, options)
  }
  catch (error) {
    process.exit(1)
  }
}

export async function run(fn: TRun, args: string[], _options: { [key: string]: string } = {}) {
  const cwd = process.cwd()
  const command = await fn(args, {
    cwd,
  })
  console.log('command', command)
  command && await (
    command === 'cli'
      ? interactEntry()
      : execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd })
  )
}
