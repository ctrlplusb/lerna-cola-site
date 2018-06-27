const chokidar = require('chokidar')
const path = require('path')
const generate = require('./generate')

chokidar
  .watch([
    path.join(process.cwd(), 'pages-data'),
    path.join(process.cwd(), 'pages-templates'),
  ])
  .on('all', () => {
    generate()
  })
