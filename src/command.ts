import ora from 'ora'
import chalk from 'chalk'
import { downloadRepository } from './utils'

export default async function command(args: string[]): Promise<void> {
  let params:
  { [key: string]: string }
  = {
    origin: '',
    owner: '',
    repo: '',
    branch: '',
    dir: '',
  }

  if (args[0].includes('/')) {
    // vtr name/repo [filename] [branch]
    // [origin, name/repo, dir, branch]
    const [nameAndRepo] = args
    params = {
      origin: 'github',
      owner: nameAndRepo.split('/')[0],
      repo: nameAndRepo.split('/')[1],
      dir: args[1] || nameAndRepo.split('/')[1] || '',
      branch: args[2] || '',
    }
  }
  else {
    // vtr origin name/repo [filename] [branch]
    // [origin, name/repo, dir, branch]
    const [origin, nameAndRepo] = args
    params = {
      origin,
      owner: nameAndRepo.split('/')[0],
      repo: nameAndRepo.split('/')[1],
      dir: args[2] || nameAndRepo.split('/')[1] || '',
      branch: args[3] || '',
    }
  }

  const { origin, owner, repo, dir, branch } = params

  const repoUrl = `${origin}:${owner}/${repo}${branch ? `#${branch}` : ''}`

  const oraInstance = ora(chalk.blue('download repository ing...')).start()

  let downloadResult = true
  downloadResult = await downloadRepository(repoUrl, dir)

  downloadResult
    ? oraInstance.succeed(chalk.green('download repository success'))
    : oraInstance.fail(chalk.red('download repository fail'))
}
