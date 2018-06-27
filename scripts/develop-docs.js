const chokidar = require('chokidar')
const path = require('path')
const generateDocPages = require('./utils/generate-doc-pages')

chokidar.watch(path.join(process.cwd(), 'data')).on('all', () => {
  generateDocPages()
})
