/**
 * @description 抛出异常
 * @param message 异常消息
 */
export function throwError(message: string): void {
  console.log('message', message)
  process.exit(1)
}
