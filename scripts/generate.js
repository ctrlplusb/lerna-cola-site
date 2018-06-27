const fs = require('fs-extra')
const path = require('path')
const generateDocPages = require('../file-tree-generator/generate')

module.exports = () => {
  const pageData = generateDocPages({
    templatesDir: path.join(process.cwd(), 'pages-templates'),
    inputDir: path.join(process.cwd(), 'pages-src'),
    outputDir: path.join(process.cwd(), 'pages'),
  })

  const pageDataDir = path.join(process.cwd(), 'pages-data')
  fs.ensureDirSync(pageDataDir)
  fs.writeFileSync(
    path.join(pageDataDir, 'index.json'),
    JSON.stringify(pageData, null, 2),
    { encoding: 'utf8' },
  )
}
