import Head from 'next/head'

import { getCharactersList } from '../services/characters'
import InfoCard from '../components/infoCard'

const CharactersPage = ({ characters }) => {
	return (
		<>
			<Head>
				<title>List of Marvel Chacters</title>
			</Head>
			<div className="main-container">
				<div className="info-cards">
					{
						characters.map(({ id, name, thumbnail }) => (
							<InfoCard
								id={id}
								name={name}
								thumbnail={thumbnail}
							/>
						))
					}
				</div>
			</div>
		</>
	)
}

CharactersPage.getInitialProps = async () => {
	const characters = await getCharactersList()
	return { characters }
}

export default CharactersPage
