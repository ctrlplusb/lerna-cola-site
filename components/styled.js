import styled from 'react-emotion'

export const Anchor = styled.a`
  color: ${props =>
    props.contrast
      ? props.theme.colors.brandingContrast
      : props.theme.colors.branding};
  cursor: pointer;
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

export const H1 = styled.h1`
  font-size: ${props => 45 / props.theme.baseFontSize}rem;
  font-family: ${props => props.theme.fonts.secondary};
  margin-bottom: ${props => 28 / props.theme.baseFontSize}rem;
  margin-top: ${props => 28 / props.theme.baseFontSize}rem;
`

export const H2 = styled.h1`
  font-size: ${props => 45 / props.theme.baseFontSize}rem;
  font-family: ${props => props.theme.fonts.secondary};
`

export const InlineAnchor = styled(Anchor)`
  font-family: ${props => props.theme.fonts.primary};
`

export const Li = styled.li``

export const P = styled.p`
  margin-bottom: 1rem;
`

export const Strong = styled.strong`
  font-weight: 700;
`

export const Ul = styled.ul`
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-left: 1.5rem;
`
