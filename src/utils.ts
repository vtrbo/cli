// import chalk from 'chalk'

/**
 * @description 抛出异常
 * @param message 异常消息
 */
export function throwError(message: string, error?: Error): void {
  // console.log(`${chalk.green('[@vtrbo/cli]')} ${chalk.yellow('=>')} ${chalk.red(message)}`)
  console.log(`[@vtrbo/cli] => ${message}`)
  error && console.log(error)
  process.exit(0)
}

/**
 * @description 日志输出样式
 * @param { string } message 消息
 * @param { string } _color 颜色
 * @returns { string }
 */
export function clog(message: string, _color: string): string {
  // return `${chalk.green('[@vtrbo/cli]')} ${chalk.yellow('=>')} ${(chalk as any)[color](message)}`
  return `[@vtrbo/cli] => ${message}`
}
