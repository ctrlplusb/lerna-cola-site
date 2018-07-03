import { findDOMNode } from 'react-dom'
import Prism from 'prismjs'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'react-emotion'
import Config from '../config'

Config.codeComponent.supportedLangauges.forEach(language => {
  if (!Prism.languages[language]) {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(`prismjs/components/prism-${language}`)
  }
})

export default class Code extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    language: PropTypes.oneOf(Config.codeComponent.supportedLangauges),
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
    this.getLineCount()
  }

  getLineCount = () => {
    let count = 1
    let index = -1
    // eslint-disable-next-line no-constant-condition
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
              <code>
                {[...new Array(lineCount)].reduce(
                  (acc, _, idx) =>
                    acc.concat(`${lineOffset + idx + 1}\n`.padStart(3, ' ')),
                  '',
                )}
              </code>
            </pre>
          </LineNumbers>
        )}
        <SourceContainer>
          <pre
            className={language ? `language-${language}` : undefined}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            <Source
              innerRef={this.codeRef}
              dangerouslySetInnerHTML={{
                __html: language
                  ? Prism.highlight(children, Prism.languages[language])
                  : children,
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
  font-family: ${props => props.theme.fonts.code};
  margin: 1rem 0;
`

const Source = styled.code`
  font-family: ${props => props.theme.fonts.code};
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
