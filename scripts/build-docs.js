const dedent = require('dedent')
const fs = require('fs-extra')
const path = require('path')
const capitalize = require('lodash.capitalize')
const rimraf = require('rimraf')
const menu = require('../data/menu.json')
const slugify = require('../utils/slugify')

const inputDir = path.resolve(process.cwd(), './data')
const outputDir = path.resolve(process.cwd(), './pages/docs')

rimraf.sync(outputDir)

fs.ensureDirSync(inputDir)
fs.ensureDirSync(outputDir)

const buildComponent = ({ depth, source }) =>
  dedent(`
    import React from 'react'
    import Markdown from '../../${Array.from(new Array(depth))
      .map(() => '../')
      .join()}components/markdown'

    const source = \`
    ${source.replace(/`/gi, '\\\\`')}
    \`

    export default () => <Markdown source={source} />
  `)

buildComponent({
  name: capitalize('Foo'),
  source: '## Foo',
})

const parseMenu = (current, prevDepth, prevPath) => {
  const depth = prevDepth + 1
  if (current.sections) {
    current.sections.forEach(section => {
      const sectionPath = path.join(prevPath, slugify(section.title))
      fs.ensureDirSync(sectionPath)
      parseMenu(section, depth, sectionPath)
    })
  }
  if (current.entries) {
    current.entries.forEach(entry => {
      const filename = `${slugify(entry.title)}.js`
      const source = fs.readFileSync(path.join(inputDir, entry.source), {
        encoding: 'utf8',
      })
      fs.writeFileSync(
        path.join(prevPath, filename),
        buildComponent({ depth, source }),
        { encoding: 'utf8' },
      )
    })
  }
}

parseMenu(menu, -1, outputDir)
