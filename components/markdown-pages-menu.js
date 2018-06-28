import Link from 'next/link'
import PropTypes from 'prop-types'
import walk from 'templatiser/walk'
import React from 'react'
import { Anchor, Heading1 } from './styled'

export default function TreeMenu({ tree }) {
  return walk(
    tree,
    (acc, { config, relativePath, name, type }) => {
      if (type === 'directory') {
        return [...acc, <Heading1>{config.title || name}</Heading1>]
      } else if (type === 'file') {
        return [
          ...acc,
          <Link>
            <Anchor href={`${relativePath}/${name}`}>
              {config.title || name}
            </Anchor>
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
