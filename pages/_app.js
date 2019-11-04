import React from 'react'
import App from 'next/app'

import '../assets/styles/app.scss'
import BrandHeader from '../components/brandHeader'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <BrandHeader />
      <Component {...pageProps} />
    )
  }
}

export default MyApp