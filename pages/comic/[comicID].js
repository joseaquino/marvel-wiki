import { useEffect, useState } from 'react'

import ItemDetailNav from '../../components/itemDetailNav'
import CharacterCard from '../../components/characterCard'
import { getComic, getComicCharacters } from '../../services/comics'

const ComicDetailPage = ({ comic }) => {
	const [characters, setCharacters] = useState([])
	const [charactersLoaded, setCharactersLoaded] = useState(false)

	useEffect(() => {
		getComicCharacters(comic.id)
			.then(setCharacters)
			.then(() => setCharactersLoaded(true))
	}, [])

	return (
		<div className="main-container detail-page">
			<ItemDetailNav
				backUrl="/comics"
				onBookmark={() => console.log(comic)}
				text="Back to Comics"
				width="215px"
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
	)
}

ComicDetailPage.getInitialProps = async ({ query }) => {
	const comic = await getComic(query.comicID)
	return { comic }
}

export default ComicDetailPage
