import React from 'react'
import App, { Container } from 'next/app'
import Theme from '../components/theme'
import Header from '../components/header'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Theme>
          <div>
            <Header />
            <Component {...pageProps} />
          </div>
        </Theme>
      </Container>
    )
  }
}
