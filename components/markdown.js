/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import dedent from 'dedent'
import { InlineAnchor, Heading1, Ul, Li, Paragraph, Strong } from './styled'
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
  heading: Heading1,
  link: InlineAnchor,
  list: Ul,
  listItem: Li,
  paragraph: Paragraph,
  strong: Strong,
}

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      allowedTypes={allowedTypes}
      renderers={renderers}
      skipHtml
      source={dedent(children)}
    />
  )
}

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
}
