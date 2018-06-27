/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

const fs = require('fs-extra')
const pathType = require('path-type')
const createTemplate = require('lodash.template')
const rimraf = require('rimraf')
const { join: joinPath, relative: relativePath } = require('path')
const treeReduce = require('./walk-page-data')

const titleRegex = /^(-+)\n+Title:(\s+)?([\w\s]+)/m
const mdRegex = /\.md$/

const extractPageData = dir => {
  const traverse = (path, acc) => {
    const results = fs.readdirSync(path)
    return results.reduce((pathAcc, cur) => {
      const currentPath = joinPath(path, cur)
      if (pathType.fileSync(currentPath) && mdRegex.test(cur)) {
        const fileSource = fs.readFileSync(currentPath).toString()
        const match = fileSource.match(titleRegex)
        const slug = cur.replace(mdRegex, '')
        const title = match ? match[3].trim() : slug
        pathAcc.pages = pathAcc.pages || []
        pathAcc.pages.push({
          title,
          slug,
          source: currentPath,
        })
      } else if (pathType.dirSync(currentPath)) {
        pathAcc.directories = acc.directories || []
        const metaPath = joinPath(currentPath, 'meta.json')
        const title = fs.existsSync(metaPath)
          ? JSON.parse(fs.readFileSync(metaPath, { encoding: 'utf8' })).title
          : cur
        const directory = {
          title,
          slug: cur,
        }
        pathAcc.directories.push(traverse(currentPath, directory))
        return pathAcc
      }
      return acc
    }, acc)
  }
  return traverse(dir, {})
}

const generateFileTree = ({ pageData, outputDir, template }) => {
  fs.ensureDirSync(outputDir)

  treeReduce(pageData, (acc, { current, type, depth, path }) => {
    if (type === 'directory') {
      const dirPath = joinPath(outputDir, path)
      rimraf.sync(dirPath)
      fs.ensureDirSync(dirPath)
    } else if (type === 'page') {
      const filePath = joinPath(outputDir, `${path}.js`)
      const source = fs.readFileSync(current.source, {
        encoding: 'utf8',
      })
      fs.writeFileSync(
        filePath,
        template({ depth, source, current, path, filePath }),
        {
          encoding: 'utf8',
        },
      )
      console.log('Generated file at', filePath)
    }
  })
}

module.exports = ({ templatesDir, outputDir, inputDir }) => {
  const pageData = extractPageData(inputDir)
  const templateSrc = fs.readFileSync(joinPath(templatesDir, 'default'), {
    encoding: 'utf8',
  })
  const cwd = process.cwd()
  const applyTemplate = createTemplate(templateSrc)
  generateFileTree({
    pageData,
    outputDir,
    template: ({ filePath, source }) =>
      applyTemplate({
        pathToRoot: relativePath(filePath, cwd).replace(/\.\.$/, ''),
        source: source.replace(/`/g, '\\`'),
      }),
  })
  return pageData
}
