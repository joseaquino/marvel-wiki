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

export async function getServerSideProps({ query }) {
	const { comics, total } = await getComicsList(query)
	return {
		props: {
			comics,
			total
		}
	}
}

export default ComicsPage
