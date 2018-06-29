import React from 'react'
import styled from 'react-emotion'
import Markdown from '../components/markdown'
import { Button } from '../components/styled'

export default () => (
  <div>
    <IntroBanner>
      <Title>Lerna Cola</Title>
      <SubTitle>Superpowers for your Lerna monorepos</SubTitle>
    </IntroBanner>
    <Content>
      <Markdown>
        {`
          [Lerna](https://lernajs.io/) makes it crazy easy to manage cross package dependencies and provides sane methods to version them. It takes away the fear of creating and maintaining a wide set of packages, allowing us to fully embrace the module ethos by creating packages with isolated responsibilities.

          Lerna Cola wants to build on top of these core principles by providing the following additional features:

          - Easily **enrich your packages** with a **compilation/transpilation/bundling** step (babel/flow/typescript/reasonml/webpack/parcel/etc/etc/etc).
          - Take away the fear of building a wide set of **microservices/lambda packages** by providing a **rich development service** that handles **hot/auto reloading** of your packages. This allows for a **fluid development experience** reminiscent of old school single package/repository based development.
          - **Deploy** your packages with a simple command to a **cloud provider** of your choice.

          You access the features via one of the 4 CLI commands that Lerna Cola provides: [\`clean\`](#clean), [\`build\`](#build), [\`develop\`](#develop), and [\`deploy\`](#deploy).

          The commands utilise a rich plugin eco-system, allowing for 3rd party contributions.

          Lift your build, development and deployment to the root of your monorepo, keep your packages clean, and utilise the full benefits of a monorepo structure.
        `}
      </Markdown>
      <Button>Read the docs</Button>
    </Content>
  </div>
)

const IntroBanner = styled.div`
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

const Content = styled.div`
  ${props => props.theme.commonRules.pageGutter};
  max-width: 600px;
  margin: 0 auto;
  ${props => props.theme.commonRules.contentMargins};
`
