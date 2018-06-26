import React from 'react'
import styled from 'react-emotion'
import TreeMenu from '../components/tree-menu'
import docsTree from '../data/tree.json'

export default () => (
  <div>
    <Header>
      <Title>Lerna Cola</Title>
      <SubTitle>Superpowers for your Lerna monorepos</SubTitle>
    </Header>
    <TreeMenu tree={docsTree} root="/docs" />
  </div>
)

const Header = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.branding};
  color: ${props => props.theme.colors.brandingContrast};
  display: flex;
  flex-direction: column;
  height: ${props => 300 / props.theme.baseFontSize}rem;
  justify-content: center;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2rem;
  font-family: ${props => props.theme.fonts.secondary};
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
`

const SubTitle = styled.p`
  margin: 0;
  font-size: ${props => 24 / props.theme.baseFontSize}rem;
`
