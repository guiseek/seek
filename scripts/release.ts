#!/bin/node

import {
  // npmCi,
  checkFormat,
  workspaceLint,
  affectedLint,
  affectedTest,
  affectedBuild,
  affectedRelease,
} from './tasks'
import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
  [
    // {
    //   title: 'Install',
    //   task: async () => await npmCi,
    // },
    {
      title: 'Check Format',
      task: async () => await checkFormat,
    },
    {
      title: 'Lint Workspace & Code',
      task: async (ctx, task) =>
        task.newListr(
          (parent) => [
            {
              title: 'Workspace',
              task: async () => await workspaceLint,
            },
            {
              title: 'Code',
              task: async () => await affectedLint,
            },
          ],
          {
            exitOnError: true,
            concurrent: false,
          }
        ),
    },
    {
      title: 'Unit Tests',
      task: async () => await affectedTest,
    },
    {
      title: 'Test Builds',
      task: async () => await affectedBuild,
    },
    // {
    //   title: 'Release',
    //   task: async () => await affectedRelease,
    // },
  ],
  {
    /* options */
    concurrent: false,
    exitOnError: true,
  }
)

tasks.run(null).then(console.log).catch(console.error)

// echo Check Format
// npm run format:check

// echo Lint Workspace & Code
// npm run nx -- workspace-lint && npm run affected:lint -- --all

// echo Unit Tests
// npm run affected:test -- --all

// echo Build, Release on GitHub & Publish to NPM
// npm run release
