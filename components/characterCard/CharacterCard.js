import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import './CharacterCard.scss'
import BookmarkBtn from '../buttons/bookmarkBtn/BookmarkBtn'
import { toggleCharacterBookmark, isCharacterBookmarked } from '../../services/bookmarks'

const CharacterCard = ({ id, name, thumbnail, description, stories }) => {
	const [isBookmarkedState, setIsBookmarkedState] = useState(false)

	const bookmarkItem = () => {
		toggleCharacterBookmark({
			id, name, thumbnail, description, stories
		})
		return isCharacterBookmarked(id)
	}

	// The bookmarking of the card must be done after render as this component
	// will be rendered server side where there is no local storage, and it only
	// needs to be done on the first render
	useEffect(() => {
		setIsBookmarkedState(isCharacterBookmarked(id))
	}, [])

	return (
		<div className="character-card">
			<Link href="/character/[characterID]" as={`/character/${id}`} prefetch={false}>
				<a>
					<div className="card-image">
						<span
							style={{ backgroundImage: `url(${thumbnail})`}}
						/>
						<svg
							width="238"
							height="43"
							viewBox="0 0 238 43"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M173.368 12.0802C137.895 22.5396 92.2458 36 0 36V42C92.5 42 137.895 30.4091 173.368 21.4024C195.907 15.6795 214.337 11 238 11V0C214.337 0 195.907 5.43431 173.368 12.0802Z"
								fill="#322543"
							/>
							<path
								d="M173.368 20.4024C137.895 29.4091 92.2458 41 0 41V43H238V10C215 10 195.907 14.6795 173.368 20.4024Z"
								fill="#E7DE10"
							/>
						</svg>
					</div>

					<p>{name}</p>
				</a>
			</Link>
			<span className="bookmarker">
				<BookmarkBtn
					label={`Add character ${name} to bookmarks`}
					onBookmark={bookmarkItem}
					isBookmarked={isBookmarkedState}
				/>
			</span>
		</div>
	)
}

export default CharacterCard
