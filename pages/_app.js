import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import '../assets/styles/app.scss'

import BrandHeader from '../components/brandHeader'
import MainNav from '../components/mainNav'

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<>
				<Head>
					<link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap" rel="stylesheet" />
				</Head>
				<BrandHeader />
				<MainNav />
				<Component {...pageProps} />
			</>
		)
	}
}

export default MyApp
