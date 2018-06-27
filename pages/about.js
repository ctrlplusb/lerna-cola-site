import React, { Component } from 'react'

export default class About extends Component {
  static async getInitialProps() {
    const data = await Promise.resolve('Hello world')
    return { message: data }
  }

  render() {
    console.log(this.props)
    return <div>{this.props.message}</div>
  }
}
