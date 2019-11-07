import Head from 'next/head'

import { getComicsList, getNextComicsPage } from '../services/comics'
import ComicCard from '../components/comicCard'
import ContinousLoadingGrid from '../components/layouts/ContinuosLoadingGrid'

const ComicsPage = ({ comics, total }) => 
	<>
		<Head>
			<title>List of Marvel comics.</title>
		</Head>
		<ContinousLoadingGrid
			cards={comics}
			total={total}
			onLoadMore={getNextComicsPage}
			cardItemRender={ComicCard}
		/>
	</>

ComicsPage.getInitialProps = async ({ query }) => {
	const response = await getComicsList(query)
	return response
}

export default ComicsPage
