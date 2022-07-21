import { defineBuildConfig } from 'unbuild'
import fg from 'fast-glob'
const files = fg.sync('src/commands/*.ts').map(i => i.slice(0, -3))
console.log('files', files)
export default defineBuildConfig({
  entries: [
    ...files,
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})
