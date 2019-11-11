import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Error = ({ statusCode }) => (
	<>
		<Head>
			<title>
				{statusCode} : { statusCode === 404 ? 'Page was not found' : 'An unexpected error has ocurred' }
			</title>
		</Head>
		<div className="main-container error-page">
			{
				statusCode === 404
					? <div className="not-found-error">
						<div>
							<h1>404</h1>
							<p>It seems that what your're looking for is no longer here, it might have disappeared...</p>
							<Link href="/">
								<a>Go back home</a>
							</Link>
						</div>
						<span></span>
					</div>
					: 'An unexpected error has occurred'
			}
		</div>
	</>
)

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error
