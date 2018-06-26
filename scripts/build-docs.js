/* eslint-disable no-console */

const dedent = require('dedent')
const path = require('path')
const generateFileTree = require('./utils/generate-file-tree')

generateFileTree({
  inputDir: path.resolve(process.cwd(), './data'),
  outputDir: path.resolve(process.cwd(), './pages/docs'),
  template: ({ depth, source }) =>
    dedent(`
  import React from 'react'
  import Markdown from '../../${Array.from(new Array(depth))
    .map(() => '../')
    .join('')}components/markdown'

  const source = \`
  ${source.replace(/`/gi, '\\\\`')}
  \`

  export default () => <Markdown source={source} />`),
})
