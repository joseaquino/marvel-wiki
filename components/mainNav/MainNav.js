import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import CharactersFilters from '../filters/CharacterFilters'
import ComicsFilters from '../filters/ComicsFilters'

import './MainNav.scss'

const filters = {
	'/': CharactersFilters,
	'/comics': ComicsFilters
}

const MainNav = () => {
	const router = useRouter()
	const { pathname } = router

	const isNavVisible = () =>
		pathname === '/' || pathname === '/comics' || pathname === '/bookmarks'

	const hasFilters = () => filters[pathname] !== undefined

	const Filter = () => 
		typeof(filters[pathname]) === 'function'
			? filters[pathname]()
			: null

	return (
		isNavVisible()
		?  <div className="nav-container">
				<nav>
					<Link href="/" as="/" prefetch={false}>
						<a className={pathname === '/' ? 'active' : ''} id="characters-nav">
							Characters
						</a>
					</Link>
					<Link href="/comics" as="/comics" prefetch={false}>
						<a className={pathname === '/comics' ? 'active' : ''} id="comics-nav">
							Comics
						</a>
					</Link>
					<Link href="/bookmarks" as="/bookmarks" prefetch={false}>
						<a className={pathname === '/bookmarks' ? 'active' : ''} id="bookmarks-nav">
							Bookmarks
						</a>
					</Link>
					<span className="active-indicator" />
				</nav>
				{
					hasFilters()
						? <div className="page-filters">{ <Filter /> }</div>
						: null
				}
			</div>
		: null
	)
}

export default MainNav
