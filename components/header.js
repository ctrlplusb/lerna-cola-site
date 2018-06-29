import React from 'react'
import Link from 'next/link'
import styled, { css } from 'react-emotion'
import { Anchor } from './styled'
import { GitHub } from './social-icons'

export default function Header() {
  return (
    <Container>
      <FixedContainer>
        <div>
          <HeaderLink>
            <Link href="/" prefetch>
              <HeaderAnchor contrast>HOME</HeaderAnchor>
            </Link>
          </HeaderLink>
          <HeaderLink>
            <Link href="/docs/getting-started/installation" prefetch>
              <HeaderAnchor contrast>DOCS</HeaderAnchor>
            </Link>
          </HeaderLink>
        </div>
        <div>
          <HeaderAnchor href="/docs">
            <GitHub contrast />
          </HeaderAnchor>
        </div>
      </FixedContainer>
    </Container>
  )
}

const transition = css`
  transition-duration: 250ms;
  transition-timing-function: ease-out;
`

const Container = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.branding};
  display: flex;
  height: ${props => 60 / props.theme.baseFontSize}rem;
  justify-content: space-between;
  ${props => props.theme.commonRules.pageGutter};
  transition-property: background-color;
  ${transition};
`
const FixedContainer = styled(Container)`
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`

const HeaderLink = styled.div`
  display: inline-block;
  margin-right: 1rem;
`

const HeaderAnchor = styled(Anchor)`
  font-size: ${props => 28 / props.theme.baseFontSize}rem;
  transition-property: color;
  ${transition};
`
