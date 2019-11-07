import Head from 'next/head'

import { getCharactersList, getNextCharactersPage } from '../services/characters'
import CharacterCard from '../components/characterCard'
import ContinousLoadingGrid from '../components/layouts/ContinuosLoadingGrid'

const CharactersPage = ({ characters, total }) =>
	<>
		<Head>
			<title>List of Marvel Chacters</title>
		</Head>
		<ContinousLoadingGrid
			cards={characters}
			total={total}
			onLoadMore={getNextCharactersPage}
			cardItemRender={CharacterCard}
		/>
	</>

CharactersPage.getInitialProps = async ({ query }) => {
	const response = await getCharactersList(query)
	return response
}

export default CharactersPage
