/* eslint-disable react/no-danger */

import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = extractCritical(page.html)
    return { ...page, ...styles }
  }

  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>Superpowers for your Lerna monorepos - Lerna Cola</title>
          <link
            href="https://fonts.googleapis.com/css?family=Sedgwick+Ave+Display|Yanone+Kaffeesatz:400,700|Ubuntu+Mono"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/normalize.css@8.0.0/normalize.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/prismjs@1.15.0/themes/prism-tomorrow.css"
          />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
