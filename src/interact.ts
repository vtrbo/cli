import prompts from 'prompts'
import ora from 'ora'
import { reminders, templates } from './constant'
import type { IInteract } from './download'
import { template } from './download'

/**
 * 交互式入口函数
 */
export async function interactEntry() {
  const choice = await prompts(reminders[0])
  console.log('choice', choice)
  const { templateName } = choice
  if (templateName === 'custom') {
    // custom template
    console.log('templateName', templateName)
  }
  else {
    // inner template
    const templatePath = templates.find(f => f.value === templateName)?.path || ''

    const answer = await prompts(reminders.slice(1))
    const process = ora('start download template').start()
    let downloadResult = true
    downloadResult = await template({
      ...choice,
      ...answer,
      templatePath,
    } as IInteract)
    downloadResult
      ? process.succeed('download template success')
      : process.fail('download fail')
  }
}
