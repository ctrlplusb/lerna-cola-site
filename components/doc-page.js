import React from 'react'
import styled from 'react-emotion'
import Markdown from './markdown'
import TreeMenu from './tree-menu'
import docsTreeDefinition from '../data/tree.json'

export default function DocPage({ children }) {
  return (
    <Container>
      <Column>
        <TreeMenu tree={docsTreeDefinition} rootPath="/docs" />
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
