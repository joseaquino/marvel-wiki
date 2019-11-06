import Head from 'next/head'

import ComicCard from '../components/comicCard'

import { getComicsList } from '../services/comics'

const ComicsPage = ({ comics }) => (
	<>
		<Head>
			<title>List of Marvel comics.</title>
		</Head>
		<div className="main-container">
			<div className="info-cards">
				{
					comics.map(comicProps => (
						<ComicCard key={comicProps.id} {...comicProps} />
					))
				}
			</div>
		</div>
	</>
)

ComicsPage.getInitialProps = async () => {
	const comics = await getComicsList()

	return { comics }
}

export default ComicsPage
