import ora from 'ora'
import prompts from 'prompts'
import { REMINDERS, TEMPLATES } from './constant'
import { downloadCommand, downloadTemplate } from './download'
import type { InteractOptions } from './types'
import { clog, throwError } from './utils'

/**
 * @description 交互式下载
 */
export function interactionPrompts() {
  prompts(REMINDERS[0]).then((branch) => {
    if (!Object.keys(branch).length)
      throwError('操作中断')

    const { templateName } = branch
    templateName === 'Custom'
      ? downloadCustom()
      : downloadPreset(templateName)
  })
}

/**
 * @description 自定义下载
 */
async function downloadCustom() {
  prompts(REMINDERS.slice(3)).then(async (answer) => {
    if (Object.keys(answer).length !== 5)
      throwError('操作中断')
    console.log('answer', answer)
    const oraInstance = ora(clog('download custom repository ing...\n', 'blue')).start()
    let downloadResult = true
    const { customOrigin, customOwner, customName, customFilename, customBranch } = answer
    downloadResult = await downloadCommand([
      customOrigin || 'github',
      `${customOwner}/${customName}`,
      customFilename || 'undefined',
      customBranch || 'undefined',
    ])

    downloadResult
      ? oraInstance.succeed(clog('download custom repository success', 'green'))
      : oraInstance.fail(clog('download custom repository fail', 'red'))
  })
}

/**
 * @description 预设下载
 * @param templateName string 模板名称
 */
function downloadPreset(templateName: string) {
  const templatePath = TEMPLATES.find(f => f.value === templateName)?.path || ''
  prompts(REMINDERS.slice(1, 3)).then(async (answer) => {
    if (Object.keys(answer).length !== 2)
      throwError('操作中断')

    const oraInstance = ora(clog('download template ing...\n', 'blue')).start()
    let downloadResult = true
    downloadResult = await downloadTemplate({
      ...answer,
      templateName,
      templatePath,
    } as InteractOptions)

    downloadResult
      ? oraInstance.succeed(clog('download template success', 'green'))
      : oraInstance.fail(clog('download template fail', 'red'))
  })
}
