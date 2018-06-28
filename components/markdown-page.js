import React from 'react'
import styled from 'react-emotion'
import Markdown from './markdown'
import MarkdownPagesMenu from './markdown-pages-menu'
import metaTree from '../markdown-pages-meta-tree.json'

export default function DocPage({ children }) {
  return (
    <Container>
      <Column>
        <MarkdownPagesMenu tree={metaTree} />
      </Column>
      <Main>
        <Markdown>{children}</Markdown>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Column = styled.div`
  width: ${props => 300 / props.theme.baseFontSize}rem;
`

const Main = styled.div`
  flex-grow: 1;
`
