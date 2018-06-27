import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import { Anchor, Heading1 } from './styled'
import treeReduce from '../utils/tree-reduce'

export default function TreeMenu({ tree, rootPath }) {
  return treeReduce(
    tree,
    (acc, { current, path, type }) => {
      if (type === 'section') {
        return [...acc, <Heading1>{current.title}</Heading1>]
      } else if (type === 'entry') {
        return [
          ...acc,
          <Link>
            <Anchor href={`${rootPath}${path}`}>{current.title}</Anchor>
          </Link>,
        ]
      }
      return acc
    },
    [],
  )
}

TreeMenu.propTypes = {
  tree: PropTypes.object.isRequired,
  rootPath: PropTypes.string,
}

TreeMenu.defaultProps = {
  rootPath: '',
}
