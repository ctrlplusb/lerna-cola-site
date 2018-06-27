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

const treeReduce = (tree, fn, acc) => {
  const walk = (current, prevDepth, prevPath, walkAcc) => {
    const depth = prevDepth + 1
    const accWithSections = current.directories
      ? current.directories.reduce((sectionAcc, section) => {
          const path = `${prevPath}/${slugify(section.title)}`
          return walk(
            section,
            depth,
            path,
            fn(sectionAcc, {
              current: section,
              type: 'directory',
              depth,
              path,
            }),
          )
        }, walkAcc)
      : walkAcc
    return current.pages
      ? current.pages.reduce(
          (eacc, entry) =>
            fn(eacc, {
              current: entry,
              type: 'page',
              depth,
              path: `${prevPath}/${slugify(entry.title)}`,
            }),
          accWithSections,
        )
      : accWithSections
  }
  return walk(tree, -1, '', acc)
}

module.exports = treeReduce
