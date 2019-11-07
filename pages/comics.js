import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import ComicCard from '../components/comicCard'
import LoadMoreBtn from '../components/buttons/loadMoreBtn'

import { getComicsList, getNextComicsPage } from '../services/comics'
import useDidUpdate from '../services/useDidUpdateHook'

const ComicsPage = ({ comics }) => {
	const router = useRouter()
	const [comicsState, setComicsState] = useState(comics)
	const currentPage = useRef(1)

	useDidUpdate(() => setComicsState(comics), [comics])

	const loadNextComicsPage = () =>
		getNextComicsPage({
			currentPage: currentPage.current,
			...router.query
		})
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

ComicsPage.getInitialProps = async ({ query }) => {
	const comics = await getComicsList(query)

	return { comics }
}

export default ComicsPage
