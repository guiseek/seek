const {
  createReleaseConfigWithScopeFilter,
} = require('../../../tools/releases')

const releaserc = createReleaseConfigWithScopeFilter({
  projectScope: 'peer-signaling',
  projectRoot: 'libs/peer/signaling',
  buildOutput: 'dist/libs/peer/signaling',
})
console.log(JSON.stringify(releaserc))
module.exports = releaserc
