import Head from 'next/head'
import Link from 'next/link'
import { FixedSizeList as List } from 'react-window';

import { useState, useEffect, useRef } from 'react'

import ComicsIcon from '../components/icons/ComicsIcon'
import CharactersIcon from '../components/icons/CharactersIcon'

import { getBookmarks, removeMarkedBookmarks } from '../services/bookmarks'

const makeBookmarkListItem = (bookmarks, menu, removalAction, reverseRemoval) => ({ index, style }) =>
	<div
		style={style}
		className={
			bookmarks[menu][index].markedForRemoval
				? 'bookmark-item bookmark-removed'
				: 'bookmark-item'
		}>
		<div className="bookmark-item-inner">
			<Link href={
				menu === "characters"
					? `/character/${bookmarks[menu][index].id}`
					: `/comic/${bookmarks[menu][index].id}`
			}>
				<a className="item-contents">
					<span
						className="item-image"
						style={{ backgroundImage: `url(${bookmarks[menu][index].thumbnail})` }}
					/>
					<h1>{
						menu === 'comics'
							? bookmarks[menu][index].title
							: bookmarks[menu][index].name
					}</h1>
				</a>
			</Link>
			<div className="bookmark-actions">{
				bookmarks[menu][index].markedForRemoval
					? <button
						type="button"
						className="item-undo"
						onClick={() => reverseRemoval(bookmarks[menu][index].id)}
					>
						Undo
					</button>
					: <button
						type="button"
						className="item-remove"
						onClick={() => removalAction(bookmarks[menu][index].id)}
					>
						Remove
					</button>
			}</div>
		</div>
	</div>

const BookmarksPage = () => {
	const [activeBookmarks, setActiveBookmarks] = useState(null)
	const [activeMenu, setActiveMenu] = useState('characters')
	const currentBookmarks = useRef(null)

	useEffect(() => {
		const bookmarks = getBookmarks()
		setActiveBookmarks(bookmarks)
		currentBookmarks.current = bookmarks
		return () => removeMarkedBookmarks(currentBookmarks.current)
	}, [])

	const markForRemoval = id => {
		const modifiedBookmarks = activeBookmarks[activeMenu].map(bookmark =>
			bookmark.id === id ? { ...bookmark, markedForRemoval: true } : bookmark
		)

		const newBookmarks = ({ ...activeBookmarks, [activeMenu]: modifiedBookmarks })
		setActiveBookmarks(newBookmarks)
		currentBookmarks.current = newBookmarks
	}

	const reverRemoval = id => {
		const modifiedBookmarks = activeBookmarks[activeMenu].map(bookmark =>
			bookmark.id === id ? { ...bookmark, markedForRemoval: false } : bookmark
		)

		const newBookmarks = ({ ...activeBookmarks, [activeMenu]: modifiedBookmarks })
		setActiveBookmarks(newBookmarks)
		currentBookmarks.current =  newBookmarks
	}

	return (
		<>
			<Head>
				<title>Bookmarked comics and characaters from the Marvel collection.</title>
			</Head>
			<div className="main-container bookmarks" role="main">
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
				<div className="bookmarks-container">{
					activeBookmarks
						? <List
							height={384}
							itemCount={activeBookmarks[activeMenu].length}
							itemSize={84}
							width="100%"
						>{
							makeBookmarkListItem(
								activeBookmarks,
								activeMenu,
								markForRemoval,
								reverRemoval
							)
						}</List>
						: null
				}</div>
			</div>
		</>
	)
}

export default BookmarksPage

