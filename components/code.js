import { findDOMNode } from 'react-dom'
import Prism from 'prismjs'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'react-emotion'
import 'prismjs/components/prism-bash'

export default class Code extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    language: PropTypes.oneOf(['javascript', 'markup', 'bash']),
    lineNumbers: PropTypes.bool,
    startLine: PropTypes.number,
  }

  static defaultProps = {
    language: 'javascript',
    lineNumbers: false,
    startLine: 1,
  }

  constructor(props) {
    super(props)
    this.state = {
      lineCount: 1,
    }
  }

  componentDidMount() {
    let count = 1
    let index = -1
    while (true) {
      index = this.code.innerText.indexOf('\n', index + 1)
      if (index === -1) {
        break
      }
      count += 1
    }
    this.setState({
      lineCount: count,
    })
  }

  codeRef = el => {
    if (!el) return
    this.code = findDOMNode(el)
  }

  render() {
    const { children, language, lineNumbers, startLine } = this.props
    const { lineCount } = this.state

    const lineOffset = startLine - 1

    return (
      <Container>
        {lineNumbers && (
          <LineNumbers>
            <pre>
              <Code>
                {[...new Array(lineCount)].reduce(
                  (acc, _, idx) =>
                    acc.concat(`${lineOffset + idx + 1}\n`.padStart(3, ' ')),
                  '',
                )}
              </Code>
            </pre>
          </LineNumbers>
        )}
        <SourceContainer>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            <Source
              className={`language-${language}`}
              innerRef={this.codeRef}
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(children, Prism.languages[language]),
              }}
            />
          </pre>
        </SourceContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
`

const Source = styled.code`
  font-family: ${props => props.theme.fonts.code} !important;
`

export const LineNumbers = styled.div`
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
`

export const SourceContainer = styled.div`
  flex-grow: 1;
`
