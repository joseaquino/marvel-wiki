import { useRef, useState } from 'react'
import Head from 'next/head'

import { getCharactersList, getNextCharactersPage } from '../services/characters'
import CharacterCard from '../components/characterCard'
import LoadMoreBtn from '../components/loadMoreBtn'

const CharactersPage = ({ characters }) => {
	const [charactersState, setCharactersState] = useState(characters)
	const currentPage = useRef(1)

	const loadNextCharactersPage = () =>
		getNextCharactersPage(currentPage.current)
			.then(newCharacters =>
				setCharactersState(charactersState.concat(newCharacters))
			)
			.then(() => currentPage.current = currentPage.current + 1)

	return (
		<>
			<Head>
				<title>List of Marvel Chacters</title>
			</Head>
			<div className="main-container">
				<div className="info-cards">
					{
						charactersState.map(({ id, name, thumbnail }, idx) => (
							<CharacterCard
								key={idx}
								id={id}
								name={name}
								thumbnail={thumbnail}
							/>
						))
					}
				</div>
				<LoadMoreBtn loaderFunc={loadNextCharactersPage} />
			</div>
		</>
	)
}

CharactersPage.getInitialProps = async () => {
	const characters = await getCharactersList()
	return { characters }
}

export default CharactersPage
