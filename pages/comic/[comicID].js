import { useEffect, useState } from 'react'

import ItemDetailNav from '../../components/itemDetailNav'
import CharacterCard from '../../components/characterCard'
import { getComic, getComicCharacters } from '../../services/comics'

const ComicDetailPage = ({ comic }) => {
	const [characters, setCharacters] = useState([])

	useEffect(() => {
		getComicCharacters(comic.id)
		.then(setCharacters)
	}, [])

	return (
		<div className="main-container detail-page">
			<ItemDetailNav backUrl="/comics" onBookmark={() => console.log(comic)} />
			<div className="detail-contents">
				<div className="detail-image comic-ratio">
					<span style={{ backgroundImage: `url(${comic.thumbnail})` }}/>
				</div>
				<div className="detail-info">
					<h1>{ comic.title }</h1>
					<p>{ comic.description }</p>
					<div className="detail-divider" />
					<h2>Characters</h2>
					<div className="detail-characters">
						{
							characters.map((character, idx) => <CharacterCard key={idx} {...character} />)
						}
					</div>
					<h2>Stories</h2>
					<ul>
						{
							comic.stories.map(story => <li><a>{ story }</a></li>)
						}
					</ul>
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
