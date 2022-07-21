export interface ICtx {
  cwd?: string
}

export type TRun = (args: string[], ctx?: ICtx) => Promise<string | undefined> | string | undefined

