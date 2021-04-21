#!/bin/node

import {
  checkFormat,
  workspaceLint,
  affectedLint,
  affectedTest,
  affectedBuild,
} from './tasks'
import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'Check Format',
      task: async () => await checkFormat,
    },
    {
      title: 'Lint Workspace & Code',
      task: async (ctx, task) =>
        task.newListr(
          (parent) => [
            // {
            //   title: 'Workspace',
            //   task: async () => await workspaceLint,
            // },
            {
              title: 'Code',
              task: async () => await affectedLint,
            },
          ],
          {
            /* options */
            concurrent: false,
            exitOnError: true,
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
  ],
  {
    /* options */
    concurrent: false,
    exitOnError: true,
  }
)

tasks.run(null).then(console.log).catch(console.error)
