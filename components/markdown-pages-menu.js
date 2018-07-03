import Link from 'next/link'
import PropTypes from 'prop-types'
import walk from 'templatiser/walk'
import styled from 'react-emotion'
import React, { createContext } from 'react'
import { Anchor } from './styled'

const { Provider, Consumer } = createContext()

const traverse = tree => {
  const elements = []

  walk(tree, current => {
    const { config, relativePath, name, type } = current
    if (type === 'directory') {
      const children = traverse(current)
      elements.push(
        <Consumer>
          {value => (
            <Provider value={value + 1}>
              <Section depth={value}>
                <SectionTitle depth={value}>
                  {config.title || name}
                </SectionTitle>
                {children}
              </Section>
            </Provider>
          )}
        </Consumer>,
      )
      return false
    } else if (type === 'file') {
      elements.push(
        <PageLink>
          <Link href={`/docs${relativePath}/${name}`}>
            <Anchor>{config.title || name}</Anchor>
          </Link>
        </PageLink>,
      )
    }
    return undefined
  })

  return elements
}

export default function MarkdownPagesMenu({ tree }) {
  return <Provider value={1}>{traverse(tree)}</Provider>
}

MarkdownPagesMenu.propTypes = {
  tree: PropTypes.object.isRequired,
}

const sizeMap = depth => {
  switch (depth) {
    case 1:
      return 36
    case 2:
      return 33
    case 3:
      return 30
    case 4:
      return 27
    case 5:
      return 24
    case 6:
    default:
      return 21
  }
}

const Section = styled.div`
  padding-left: ${props =>
    props.depth === 1 ? undefined : 15 / props.theme.baseFontSize}rem;
  margin-bottom: ${props => 20 / props.theme.baseFontSize}rem;
  position: relative;
`

const SectionTitle = styled.div`
  font-size: ${props => sizeMap(props.depth) / props.theme.baseFontSize}rem;
  font-family: ${props => props.theme.fonts.secondary};
  line-height: 1;
  margin-bottom: ${props => 15 / props.theme.baseFontSize}rem;
  position: relative;
  ::before {
    opacity: ${props => (props.depth === 1 ? 0 : 1)};
    content: "•";
    position: absolute;
    left: 0,
    top: 50%;
    transform: translateX(-140%);
  }
`

const PageLink = styled.div`
  margin-bottom: ${props => 15 / props.theme.baseFontSize}rem;
`
