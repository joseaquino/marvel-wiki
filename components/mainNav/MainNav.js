import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import './MainNav.scss'

const MainNav = () => {
	const router = useRouter()
	const { pathname } = router

	console.log(pathname)

	return (
		<div className="nav-container">
			<nav>
				<Link href="/">
					<a className={pathname === '/' ? 'active' : ''} id="characters-nav">
						Characters
					</a>
				</Link>
				<Link href="/comics">
					<a className={pathname === '/comics' ? 'active' : ''} id="comics-nav">
						Comics
					</a>
				</Link>
				<Link href="/bookmarks">
					<a className={pathname === '/bookmarks' ? 'active' : ''} id="bookmarks-nav">
						Bookmarks
					</a>
				</Link>
				<span className="active-indicator" />
			</nav>
		</div>
	)
}

export default MainNav
