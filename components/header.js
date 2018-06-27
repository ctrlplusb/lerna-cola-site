import React from 'react'
import Link from 'next/link'
import styled from 'react-emotion'
import { Anchor } from './styled'
import { GitHub } from './social-icons'

export default () => (
  <Container>
    <div>
      <HeaderLink>
        <Link>
          <HeaderAnchor href="/">HOME</HeaderAnchor>
        </Link>
      </HeaderLink>
      <HeaderLink>
        <Link>
          <HeaderAnchor href="/docs/getting-started/installation">
            DOCS
          </HeaderAnchor>
        </Link>
      </HeaderLink>
    </div>
    <div>
      <HeaderAnchor href="/docs">
        <GitHub />
      </HeaderAnchor>
    </div>
  </Container>
)

const Container = styled.div`
  align-items: center;
  display: flex;
  height: ${props => 60 / props.theme.baseFontSize}rem;
  justify-content: space-between;
  ${props => props.theme.commonRules.pageGutter};
`

const HeaderLink = styled.span`
  margin-right: 1rem;
`

const HeaderAnchor = styled(Anchor)`
  font-size: ${props => 28 / props.theme.baseFontSize}rem;
`
