import { exec } from 'child_process'
import { promisify } from 'util'
import { readFile } from 'fs'

interface ProjectNode {
  data: {
    root: string
  }
}

interface Dependency {
  type: 'static' | 'implicit'
  target: string
}

interface DependencyGraph {
  nodes: Record<string, ProjectNode>
  dependencies: Record<string, Dependency[]>
}

const paths: Record<string, string[]> = {}

export const getProjectChangePaths = async (project: string) => {
  if (!paths[project]) {
    const file = `tmp/${project}-deps.json`
    await promisify(exec)(
      ['npx', 'nx', 'dep-graph', '--focus', project, '--file', file].join(' ')
    )

    const result = await promisify(readFile)(file, 'utf8')
    const { graph }: { graph: DependencyGraph } = JSON.parse(result)

    // Include the project's root as well as the roots of all its dependencies.
    paths[project] = [
      graph.nodes[project].data.root,
      ...graph.dependencies[project]
        .map((d) =>
          d.type === 'static' ? graph.nodes[d.target].data.root : null
        )
        .filter((d) => !!d),
    ]
  }

  return paths[project]
}
