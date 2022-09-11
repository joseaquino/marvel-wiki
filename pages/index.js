import Head from 'next/head'

import { getCharactersList, getNextCharactersPage } from '../services/characters'
import CharacterCard from '../components/characterCard'
import ContinousLoadingGrid from '../components/layouts/ContinuosLoadingGrid'

const CharactersPage = ({ characters, total }) =>
	<>
		<Head>
			<title>List of Marvel Characters</title>
		</Head>
		<ContinousLoadingGrid
			cards={characters}
			total={total}
			onLoadMore={getNextCharactersPage}
			cardItemRender={CharacterCard}
		/>
	</>

export async function getServerSideProps({ query }) {
	const { characters, total } = await getCharactersList(query)
	return {
	  props: {
		characters,
		total
	  },
	}
  }

export default CharactersPage
