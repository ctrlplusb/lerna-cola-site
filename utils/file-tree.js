/* eslint-disable no-console */

const fs = require('fs-extra')
const path = require('path')
const rimraf = require('rimraf')
const slug = require('slug')

const slugify = input =>
  slug(input, {
    replacement: '-',
    symbols: true,
    remove: null,
    lower: true,
    charmap: {
      '/': '-',
    },
  })

const generate = ({ inputDir, outputDir, template }) => {
  rimraf.sync(outputDir)

  fs.ensureDirSync(outputDir)

  const treeDefinitionPath = path.join(inputDir, 'tree.json')
  if (!fs.existsSync(treeDefinitionPath)) {
    throw new Error(`No tree.json file found at ${treeDefinitionPath}`)
  }

  const treeDefinition = JSON.parse(
    fs.readFileSync(treeDefinitionPath, {
      encoding: 'utf8',
    }),
  )

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
        const filePath = path.join(prevPath, filename)
        fs.writeFileSync(filePath, template({ depth, source, entry }), {
          encoding: 'utf8',
        })
        console.log('Generated file at', filePath)
      })
    }
  }

  parseMenu(treeDefinition, -1, outputDir)
}

module.exports = {
  generate,
  slugify,
}
