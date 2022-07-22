import ora from 'ora'
import prompts from 'prompts'
import { REMINDERS, TEMPLATES } from './constant'
import { downloadTemplate } from './download'
import type { InteractOptions } from './types'

/**
 * @description 交互式下载
 */
export async function interactionPrompts(): Promise<void> {
  const branch = await prompts(REMINDERS[0])
  const { templateName } = branch
  templateName === 'Custom'
    ? downloadCustom(templateName)
    : downloadPreset(templateName)
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
async function downloadPreset(templateName: string) {
  console.log('download template', templateName)

  const templatePath = TEMPLATES.find(f => f.value === templateName)?.path || ''
  const answer = await prompts(REMINDERS.slice(1))
  const process = ora('start download template').start()

  try {
    let result = true
    const { projectName } = answer
    const interactOptions: InteractOptions = {
      projectName,
      templateName,
      templatePath,
    }
    result = await downloadTemplate(interactOptions)
    result
      ? process.succeed('download template success')
      : process.fail('download fail')
  }
  catch (error) {
    console.log('[@vtrbo/cli] => download template error')
    console.log(error)
    process.fail('download template fail')
  }
}
