const fs = require('fs-extra')
const path = require('path')
const generateDocPages = require('templatiser')
const constants = require('../../constants')

module.exports = () => {
  const metaTree = generateDocPages({
    templatesDir: path.join(process.cwd(), constants.markdownTemplates),
    inputDir: path.join(process.cwd(), constants.markdownPages),
    outputDir: path.join(process.cwd(), constants.nextPages),
    allowedFiles: ['.md'],
    // We need to escape the ` character as we will be inserting the md source
    // as within string template literal
    preprocessSource: source => source.replace(/`/g, '\\`'),
  })

  fs.writeFileSync(
    path.join(process.cwd(), constants.markdownMetaTreeFile),
    JSON.stringify(metaTree, null, 2),
    { encoding: 'utf8' },
  )
}
