import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Markdown from './markdown'
import MarkdownPagesMenu from './markdown-pages-menu'
import metaTree from '../markdown-pages-meta-tree.json'

export default function MarkdownPage({ children }) {
  return (
    <Container>
      <Column>
        <MarkdownPagesMenu tree={metaTree} rootPath="docs" />
      </Column>
      <Main>
        <Markdown>{children}</Markdown>
      </Main>
    </Container>
  )
}

MarkdownPage.propTypes = {
  children: PropTypes.string,
}

const Container = styled.div`
  display: flex;
  ${props => props.theme.commonRules.pageGutter};
  ${props => props.theme.commonRules.contentMargins};
`

const Column = styled.div`
  width: ${props => 300 / props.theme.baseFontSize}rem;
`

const Main = styled.div`
  flex-grow: 1;
`
