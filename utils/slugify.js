const slug = require('slug')

module.exports = input =>
  slug(input, {
    replacement: '-',
    symbols: true,
    remove: null,
    lower: true,
    charmap: {
      '/': '-',
    },
  })
