import Head from 'next/head'
import { useEffect, useState } from 'react'

import ItemDetailNav from '../../components/itemDetailNav'
import ComicCard from '../../components/comicCard'
import { getCharacter, getCharacterComics } from '../../services/characters'
import {isCharacterBookmarked, toggleCharacterBookmark } from '../../services/bookmarks'

const CharacterDetailPage = ({ character }) => {
	const [comics, setComics] = useState([])
	const [comicsLoaded, setComicsLoaded] = useState(false)
	const [isBookmarked, setIsBookmarked] = useState(false)

	useEffect(() => {
		// Since the component also renders on the server where there is no
		// Local Storage, we need to delay the bookmark state until the component mounts
		const checkIfBookmarked = isCharacterBookmarked(character.id)
		if (isBookmarked !== checkIfBookmarked) {
			setIsBookmarked(checkIfBookmarked)
		}

		// Load the associated characters when component loads to not
		// extend more the response of the page as this content is secondary
		// and only needs to be loaded when mount
		if (character.id) {
			getCharacterComics(character.id)
				.then(setComics)
				.then(() => setComicsLoaded(true))
		}
	}, [])

	// Toggles the bookmark state of the loaded comic and triggers
	// the removal of it from the Local Storage
	const toggleBookmark = () => {
		toggleCharacterBookmark(character)
		setIsBookmarked(!isBookmarked)
	}

	return (
		<>
			<Head>Profile page of comic character { character.name }</Head>
			<div className="main-container detail-page" role="main">
				<ItemDetailNav
					backUrl="/"
					onBookmark={toggleBookmark}
					text="Back to Characters"
					width="250px"
					isBookmarked={isBookmarked}
					bookmarkLabel={`Add character ${character.name} to the bookmarks`}
				/>
				<div className="detail-contents">
					<div className="detail-image character-ratio">
						<span style={{ backgroundImage: `url(${character.thumbnail})` }}/>
					</div>
					<div className="detail-info">
						<h1>{ character.name }</h1>
						{ 
							character.description === ''
								? <span className="no-value">No description available for this character.</span>
								: <p>{ character.description }</p>
						}
						<div className="detail-divider" />
						<h2>Comics</h2>
						{
							comicsLoaded && comics.length === 0
								? <span className="no-value">There are no comics listed for this character.</span>
								: <div className="detail-characters">
									{ comics.map((comic, idx) => <ComicCard key={idx} {...comic} />) }
								</div>
						}
						<div className="detail-divider" />
						<h2>Stories</h2>
						{
							character.stories.length === 0
								? <span className="no-value">There are no stories associated with this character.</span>
								: <ul>
									{ character.stories.map((story, idx) => <li key={idx}><a>{ story }</a></li>) }
								</ul>
						}
					</div>
				</div>
			</div>
		</>
	)
}

CharacterDetailPage.getInitialProps = async ({ query }) => {
	const character = await getCharacter(query.characterID)
	return { character }
}

export default CharacterDetailPage
