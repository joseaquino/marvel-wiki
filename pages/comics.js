import { useRef, useState } from 'react'
import Head from 'next/head'

import ComicCard from '../components/comicCard'
import LoadMoreBtn from '../components/loadMoreBtn'

import { getComicsList, getNextComicsPage } from '../services/comics'

const ComicsPage = ({ comics }) => {
	const [comicsState, setComicsState] = useState(comics)
	const currentPage = useRef(1)

	const loadNextComicsPage = () =>
		getNextComicsPage(currentPage.current)
			.then(newComics =>
				setComicsState(comicsState.concat(newComics))
			)
			.then(() => currentPage.current = currentPage.current + 1)

	return (
		<>
			<Head>
				<title>List of Marvel comics.</title>
			</Head>
			<div className="main-container">
				<div className="info-cards">
					{
						comicsState.map((comicProps, idx) => (
							<ComicCard key={idx} {...comicProps} />
						))
					}
				</div>
				<LoadMoreBtn loaderFunc={loadNextComicsPage} />
			</div>
		</>
	)
}

ComicsPage.getInitialProps = async () => {
	const comics = await getComicsList()

	return { comics }
}

export default ComicsPage
