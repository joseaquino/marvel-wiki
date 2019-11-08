import Head from 'next/head'
import { useEffect, useState } from 'react'

import ItemDetailNav from '../../components/itemDetailNav'
import CharacterCard from '../../components/characterCard'
import { getComic, getComicCharacters } from '../../services/comics'
import { addComicToBookmarks, isComicBookmarked, removeComicBookmark } from '../../services/bookmarks'

const ComicDetailPage = ({ comic }) => {
	const [characters, setCharacters] = useState([])
	const [charactersLoaded, setCharactersLoaded] = useState(false)
	const [isBookmarked, setIsBookmarked] = useState(isComicBookmarked(comic.id))

	useEffect(() => {
		getComicCharacters(comic.id)
			.then(setCharacters)
			.then(() => setCharactersLoaded(true))
	}, [])

	const toggleBookmark = () => {
		if (isBookmarked) {
			removeComicBookmark(comic)
		} else {
			addComicToBookmarks(comic)
		}

		setIsBookmarked(!isBookmarked)
	}

	return (
		<>
			<Head>Detail page of for comic { comic.title }</Head>
			<div className="main-container detail-page" role="main">
				<ItemDetailNav
					backUrl="/comics"
					onBookmark={toggleBookmark}
					text="Back to Comics"
					width="215px"
					isBookmarked={isBookmarked}
				/>
				<div className="detail-contents">
					<div className="detail-image comic-ratio">
						<span style={{ backgroundImage: `url(${comic.thumbnail})` }}/>
					</div>
					<div className="detail-info">
						<h1>{ comic.title }</h1>
						{ 
							comic.description === ''
								? <span className="no-value">No description available for this comic book.</span>
								: <p>{ comic.description }</p>
						}
						<div className="detail-divider" />
						<h2>Characters</h2>
						{
							charactersLoaded && characters.length === 0
								? <span className="no-value">There are no characters listed for this comic book.</span>
								: <div className="detail-characters">
									{ characters.map((character, idx) => <CharacterCard key={idx} {...character} />) }
								</div>
						}
						<div className="detail-divider" />
						<h2>Stories</h2>
						{
							comic.stories.length === 0
								? <span className="no-value">There are no stories associated with this comic book</span>
								: <ul>
									{ comic.stories.map((story, idx) => <li key={idx}><a>{ story }</a></li>) }
								</ul>
						}
					</div>
				</div>
			</div>
		</>
	)
}

ComicDetailPage.getInitialProps = async ({ query }) => {
	const comic = await getComic(query.comicID)
	return { comic }
}

export default ComicDetailPage
