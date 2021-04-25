
/* prettier-ignore */
type PathParams<
  Path extends string
> = Path extends `:${infer Param}/${infer Rest}`
  ? Param | PathParams<Rest>
  : Path extends `:${infer Param}`
  ? Param
  : Path extends `${infer _Prefix}:${infer Rest}`
  ? PathParams<`:${Rest}`>
  : never

type PathArgs<Path extends string> = {
  [K in PathParams<Path>]: string
}

const app = {
  get<P extends string>(
    path: P,
    handler: (req: { params: PathArgs<P> }, res: any) => void
  ): void {}
}

/**
 * Ainda não estou usando, mas quero
 * Entenda o motivo vendo as opções
 * depois de params e tente trocar
 * a string pra confirmar sua dúvida
 */
app.get('/page/:slug', (req, res) => {
  req.params
})
