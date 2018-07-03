const chokidar = require('chokidar')
const path = require('path')
const debounce = require('lodash.debounce')
const generate = require('./utils/generate')
const constants = require('../constants')

chokidar
  .watch(
    [
      path.join(process.cwd(), constants.markdownPages),
      path.join(process.cwd(), constants.markdownTemplates),
    ],
    {
      followSymlinks: true,
    },
  )
  .on(
    'all',
    debounce(() => {
      generate()
    }, 250),
  )
