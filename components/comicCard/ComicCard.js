import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import './ComicCard.scss'
import BookmarkBtn from '../buttons/bookmarkBtn'
import {toggleComicBookmark, isComicBookmarked} from '../../services/bookmarks'

const ComicCard = ({ id, title, thumbnail, issueNumber, description, stories }) => {
	const [isBookmarkedState, setIsBookmarkedState] = useState(false)

	const bookmarkItem = () => {
		toggleComicBookmark({
			id, title, thumbnail, issueNumber, description, stories
		})
		return isComicBookmarked(id)
	}

	// The bookmarking of the card must be done after render as this component
	// will be rendered server side where there is no local storage, and it only
	// needs to be done on the first render
	useEffect(() => {
		setIsBookmarkedState(isComicBookmarked(id))
	}, [])

	return (
		<div className="comic-card">
			<Link href="/comic/[comicID]" as={`/comic/${id}`} prefetch={false}>
				<a>
					<div className="comic-portrait-frame">
						<div
							className="comic-portrait"
							style={{ backgroundImage: `url(${thumbnail})`}}
						/>
					</div>
					<div className="comic-details">
						<span className="issue-number">Issue Number {issueNumber}</span>
						<p>{title}</p>
					</div>
				</a>
			</Link>
			<span className="bookmarker">
				<BookmarkBtn
					label={`Add comic ${title} to bookmarks`}
					onBookmark={bookmarkItem}
					isBookmarked={isBookmarkedState}
				/>
			</span>
		</div>
	)
}

export default ComicCard
