import React from 'react'
import Link from 'next/link'
import { Anchor, Heading1 } from './styled'
import treeReduce from '../utils/tree-reduce'

export default function TreeMenu({ tree, root }) {
  return treeReduce(
    tree,
    (acc, { current, path, type }) => {
      if (type === 'section') {
        return [...acc, <Heading1>{current.title}</Heading1>]
      } else if (type === 'entry') {
        return [
          ...acc,
          <Link>
            <Anchor href={`${root}${path}`}>{current.title}</Anchor>
          </Link>,
        ]
      }
      return acc
    },
    [],
  )
}
