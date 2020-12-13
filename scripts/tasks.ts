import { exec } from 'child_process'

const exeek = async (cmd: string): Promise<any> => {
  return await new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })
}

// export const npmCi = exeek('npm ci')

export const checkFormat = exeek('npm run format:check')

export const workspaceLint = exeek('npm run nx -- workspace-lint')

export const affectedLint = exeek('npm run affected:lint -- --all')

export const affectedTest = exeek('npm run affected:test -- --all')

export const affectedBuild = exeek('npm run affected:build -- --all')

export const affectedRelease = exeek('npm run release')
