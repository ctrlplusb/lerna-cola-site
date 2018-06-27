import React from 'react'
import PropTypes from 'prop-types'
import { hydrate, css, injectGlobal } from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

/*
const basicStyles = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 3rem 0;
  padding: 1rem 0.5rem;
`
const hoverStyles = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`
const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`

const Basic = styled.div`
  ${basicStyles};
`

const Combined = styled.div`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
`
const Animated = styled.div`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
  animation: ${props => props.animation} 0.2s infinite ease-in-out alternate;
`
*/

const theme = {
  baseFontSize: 20,
  fonts: {
    primary: '"Yanone Kaffeesatz", sans-serif',
    secondary: '"Sedgwick Ave Display", cursive',
    code: '"Ubunt Mono", monospace',
  },
  colors: {
    branding: '#fe001a',
    brandingContrast: '#fff',
  },
  commonRules: {
    pageGutter: css`
      padding-left: 2rem;
      padding-right: 2rem;
    `,
  },
}

injectGlobal`
  html, body {
    background: #fff;
    font-family: ${theme.fonts.primary};
    font-size: ${theme.baseFontSize}px;
    margin: 0;
    min-height: 100%;
    padding: 0;
  }
`

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

Theme.propTypes = {
  children: PropTypes.node,
}
