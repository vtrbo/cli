import ora from 'ora'
import prompts from 'prompts'
import { REMINDERS, TEMPLATES } from './constant'
import { downloadTemplate } from './download'
import type { InteractOptions } from './types'
import { throwError } from './utils'

/**
 * @description 交互式下载
 */
export function interactionPrompts() {
  prompts(REMINDERS[0]).then((branch) => {
    if (!Object.keys(branch).length)
      throwError('操作中断')

    const { templateName } = branch
    templateName === 'Custom'
      ? downloadCustom(templateName)
      : downloadPreset(templateName)
  })
}

/**
 * @description 自定义下载
 * @param templateName string 模板名称 在这里其实是一个自定义标识
 */
async function downloadCustom(templateName: string) {
  console.log('download custom', templateName)
}

/**
 * @description 预设下载
 * @param templateName string 模板名称
 */
function downloadPreset(templateName: string) {
  const templatePath = TEMPLATES.find(f => f.value === templateName)?.path || ''
  prompts(REMINDERS.slice(1)).then(async (answer) => {
    if (!Object.keys(answer).length)
      throwError('操作中断')

    const oraInstance = ora('download template ing...\n').start()
    let downloadResult = true
    downloadResult = await downloadTemplate({
      ...answer,
      templateName,
      templatePath,
    } as InteractOptions)

    downloadResult
      ? oraInstance.succeed('download template success')
      : oraInstance.fail('download template fail')
  })
}
