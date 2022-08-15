import chalk from 'chalk'

/**
 * @description 日志输出样式
 * @param { string } message 消息
 * @param { string } color 颜色
 * @returns { string }
 */
export function clog(message: string, color: string): string {
  return `${chalk.green('[@vtrbo/cli]')} ${chalk.yellow('=>')} ${(chalk as any)[color](message)}`
}
