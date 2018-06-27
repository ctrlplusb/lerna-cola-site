import styled from 'react-emotion'

export const Anchor = styled.a`
  color: ${props => props.theme.colors.branding};
  font-family: ${props => props.theme.fonts.secondary};
  text-decoration: none;
  &:visited,
  &:active {
    color: ${props => props.theme.colors.branding};
  }
`

export const Button = styled.button`
  align-items: center;
  background-color: ${props => props.theme.colors.branding};
  border: solid 1px ${props => props.theme.colors.branding};
  /* border-radius: 1rem; */
  color: ${props => props.theme.colors.brandingContrast};
  display: inline-flex;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  height: ${props => 40 / props.theme.baseFontSize}rem;
  padding: 0 ${props => 16 / props.theme.baseFontSize}rem;
  line-height: 1;
  letter-spacing: 1;
  vertical-align: middle;
  text-transform: uppercase;
  &:hover: {
    background-color: ${props => props.theme.colors.brandingContrast};
    color: ${props => props.theme.colors.branding};
  }
  &:disabled {
    border-bottom: #a9a9a9;
    border-top: #a9a9a9;
    border-left: #a9a9a9;
    border-right: #a9a9a9;
    background: #ccc;
  }
`

export const Heading1 = styled.h1`
  font-size: 2rem;
  font-family: ${props => props.theme.fonts.secondary};
`

export const InlineAnchor = styled(Anchor)`
  font-family: ${props => props.theme.fonts.primary};
`

export const Li = styled.li``

export const Paragraph = styled.p`
  margin-bottom: 1rem;
`

export const Strong = styled.strong`
  font-weight: 700;
`

export const Ul = styled.ul`
  margin: 0 0.5rem;
`
