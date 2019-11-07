import Head from 'next/head'

import { useState, useEffect } from 'react'

import CharacterCard from '../components/characterCard'
import ComicCard from '../components/comicCard'
import ComicsIcon from '../components/icons/ComicsIcon'
import CharactersIcon from '../components/icons/CharactersIcon'

import { getBookmarks } from '../services/bookmarks'

const BookmarksPage = () => {
	const [activeBookmarks, setActiveBookmarks] = useState(null)
	const [activeMenu, setActiveMenu] = useState('characters')
	
	useEffect(() => {
		if (!activeBookmarks) setActiveBookmarks(getBookmarks())
	}, [activeMenu])

	return (
		<>
			<Head>
				<title>Bookmarked comics and characaters from the Marvel collection.</title>
			</Head>
			<div className="main-container bookmarks">
				<div className="bookmarks-side-nav">
					<button
						type="button"
						onClick={() => setActiveMenu('characters')}
						className={activeMenu === 'characters' ? 'active' : ''}
					>
						<CharactersIcon />
						<span>Characters</span>
					</button>
					<button
						type="button"
						onClick={() => setActiveMenu('comics')}
						className={activeMenu === 'comics' ? 'active' : ''}
					>
						<ComicsIcon />
						<span>Comics</span>
					</button>
				</div>
				<div className="bookmarks-container">
					{
						activeBookmarks
						? activeBookmarks[activeMenu].map((bookmark, idx) => 
							activeMenu === 'comics'
							? <ComicCard key={idx} {...bookmark} />
							: <CharacterCard key={idx} {...bookmark} />
						)
						: null
					}
				</div>
			</div>
		</>
	)
}

export default BookmarksPage

