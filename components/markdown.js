/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import dedent from 'dedent'
import {
  InlineAnchor,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Ul,
  Li,
  P,
  Strong,
} from './styled'
import Code from './code'

const allowedTypes = [
  'break',
  'code',
  'emphasis',
  'heading',
  'image',
  'inlineCode',
  'link',
  'list',
  'listItem',
  'paragraph',
  'root',
  'strong',
]

const renderers = {
  code: ({ language, value }) => <Code language={language}>{value}</Code>,
  heading: ({ children, level }) => {
    switch (level) {
      case 1:
        return <H1>{children}</H1>
      case 2:
        return <H2>{children}</H2>
      case 3:
        return <H3>{children}</H3>
      case 4:
        return <H4>{children}</H4>
      case 5:
        return <H5>{children}</H5>
      case 6:
        return <H6>{children}</H6>
      default:
        return <P>{children}</P>
    }
  },
  link: InlineAnchor,
  list: Ul,
  listItem: Li,
  paragraph: P,
  strong: Strong,
}

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      allowedTypes={allowedTypes}
      renderers={renderers}
      skipHtml
      source={children}
    />
  )
}

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
}
