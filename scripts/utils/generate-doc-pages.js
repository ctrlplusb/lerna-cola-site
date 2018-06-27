/* eslint-disable no-console */

const dedent = require('dedent')
const path = require('path')
const generateFileTree = require('./generate-file-tree')

module.exports = () =>
  generateFileTree({
    inputDir: path.resolve(process.cwd(), './data'),
    outputDir: path.resolve(process.cwd(), './pages/docs'),
    template: ({ depth, source }) =>
      dedent(`
  import React from 'react'
  import DocPage from '../../${Array.from(new Array(depth))
    .map(() => '../')
    .join('')}components/doc-page'

  const source = \`
  ${source.replace(/`/gi, '\\\\`')}
  \`

  export default () => <DocPage>{source}</DocPage>`),
  })
