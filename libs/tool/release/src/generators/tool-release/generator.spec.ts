import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { ToolReleaseGeneratorSchema } from './schema'
import generator from './generator'
import {
  Tree,
  readJson,
  writeJson,
  addProjectConfiguration,
  readProjectConfiguration,
} from '@nrwl/devkit'

describe('tool-release generator', () => {
  let appTree: Tree
  const options: ToolReleaseGeneratorSchema = { project: 'test' }

  beforeEach(() => {
    //
    appTree = createTreeWithEmptyWorkspace()

    // prettier-ignore
    addProjectConfiguration(
      appTree,
      'test',
      { root: 'libs/test', projectType: 'library', targets: {
          build: { executor: '@nrwl/node:package', options: {
            outputPath: 'dist/libs/test' } } }
      }
    );
  })

  it('should run successfully', async () => {
    await generator(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')

    expect(config.targets.release).toBeDefined()
    expect(appTree.exists('.releaserc.json')).toBeTruthy()
    expect(appTree.exists('libs/test/.releaserc.json')).toBeTruthy()
  })

  it('should skip root .releaserc.json if present', async () => {
    await generator(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')
    const releaseConfig = { value: 'a' }
    writeJson(appTree, '.releaserc.json', releaseConfig)

    expect(config.targets.release).toBeDefined()
    expect(readJson(appTree, '.releaserc.json')).toMatchObject(releaseConfig)
  })
})
