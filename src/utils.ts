import chalk from 'chalk'

/**
 * @description 抛出异常
 * @param message 异常消息
 */
export function throwError(message: string, error?: Error): void {
  console.log(`${chalk.green('[@vtrbo/cli]')} ${chalk.yellow('=>')} ${chalk.red(message)}`)
  error && console.log(error)
  process.exit(0)
}

/**
 * @description 日志输出样式
 * @param { string } message 消息
 * @param { string } color 颜色
 * @returns { string }
 */
export function clog(message: string, color: string): string {
  return `${chalk.green('[@vtrbo/cli]')} ${chalk.yellow('=>')} ${(chalk as any)[color](message)}`
}
