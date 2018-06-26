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
    const accWithSections = current.sections
      ? current.sections.reduce((sectionAcc, section) => {
          const path = `${prevPath}/${slugify(section.title)}`
          return walk(
            section,
            depth,
            path,
            fn(sectionAcc, {
              current: section,
              type: 'section',
              depth,
              path,
            }),
          )
        }, walkAcc)
      : walkAcc
    return current.entries
      ? current.entries.reduce(
          (eacc, entry) =>
            fn(eacc, {
              current: entry,
              type: 'entry',
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
