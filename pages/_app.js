import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

import '../assets/styles/app.scss'

import BrandHeader from '../components/brandHeader'
import MainNav from '../components/mainNav'

NProgress.configure({ parent: '#progress-bar', minimum: 0.25 })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<>
				<Head>
					<link rel="Marvel Wiki fav icon" type="image/x-icon" href="/static/favicon.ico"/>
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
