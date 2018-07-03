import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Markdown from './markdown'
import MarkdownPagesMenu from './markdown-pages-menu'
import metaTree from '../markdown-pages-meta-tree.json'

export default class MarkdownPage extends Component {
  static propTypes = {
    children: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      showMobileMenu: false,
    }
  }

  toggleMobileMenu = () =>
    this.setState({ showMobileMenu: !this.state.showMobileMenu })

  render() {
    const { children } = this.props
    const { showMobileMenu } = this.state
    return (
      <Container>
        <Column show={showMobileMenu}>
          <MarkdownPagesMenu tree={metaTree} />
        </Column>
        <Main>
          <Markdown>{children}</Markdown>
        </Main>
        <MenuButton onClick={this.toggleMobileMenu}>Menu</MenuButton>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  ${props => props.theme.commonRules.clearFix};
`

const Column = styled.div`
  background-color: ${props => props.theme.colors.brandingContrast};
  padding-bottom: ${props => 28 / props.theme.baseFontSize}rem;
  padding-left: ${props => props.theme.sizes.pageGutter};
  padding-top: ${props => 28 / props.theme.baseFontSize}rem;
  width: 300px;
  height: 100%;
  transition-property: transform;
  transition-timing-function: ease-out;
  transition-duration: 250ms;

  @media (max-width: 900px) {
    box-shadow: 2px 0 3px rgba(0, 0, 0, 0.2);
    position: fixed;
    height: calc(100vh - ${props => props.theme.sizes.headerHeight});
    padding-right: ${props => props.theme.sizes.pageGutter};
    left: 0;
    top: ${props => props.theme.sizes.headerHeight};
    transform: translateX(${props => (props.show ? '0' : '-250px')});
  }
`

const Main = styled.div`
  flex-grow: 1;
  height: 100%;
  ${props => props.theme.commonRules.pageGutter};
  @media (max-width: 900px) {
    padding-left: calc(${props => props.theme.sizes.pageGutter} + 50px);
  }
`

const MenuButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  /* tranform: translateY(-100%); */
`
