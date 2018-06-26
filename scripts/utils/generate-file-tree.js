/* eslint-disable no-console */

const fs = require('fs-extra')
const { join: pathJoin } = require('path')
const rimraf = require('rimraf')
const treeReduce = require('../../utils/tree-reduce')

const generateFileTree = ({ inputDir, outputDir, template }) => {
  rimraf.sync(outputDir)

  fs.ensureDirSync(outputDir)

  const treeDefinitionPath = pathJoin(inputDir, 'tree.json')
  if (!fs.existsSync(treeDefinitionPath)) {
    throw new Error(`No tree.json file found at ${treeDefinitionPath}`)
  }

  const treeDefinition = JSON.parse(
    fs.readFileSync(treeDefinitionPath, {
      encoding: 'utf8',
    }),
  )

  treeReduce(treeDefinition, (acc, { current, type, depth, path }) => {
    if (type === 'section') {
      fs.ensureDirSync(pathJoin(outputDir, path))
    } else if (type === 'entry') {
      const filePath = pathJoin(outputDir, `${path}.js`)
      const source = fs.readFileSync(pathJoin(inputDir, current.source), {
        encoding: 'utf8',
      })
      fs.writeFileSync(filePath, template({ depth, source, current }), {
        encoding: 'utf8',
      })
      console.log('Generated file at', filePath)
    }
  })
}

module.exports = generateFileTree
