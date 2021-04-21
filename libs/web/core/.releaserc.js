const {
  createReleaseConfigWithScopeFilter,
} = require('../../../tools/releases')

const releaserc = createReleaseConfigWithScopeFilter({
  projectScope: 'web-core',
  projectRoot: 'libs/web/core',
  buildOutput: 'dist/libs/web/core',
})
console.log(JSON.stringify(releaserc))
module.exports = releaserc
