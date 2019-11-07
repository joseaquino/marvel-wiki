import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import { getCharactersList, getNextCharactersPage } from '../services/characters'
import CharacterCard from '../components/characterCard'
import LoadMoreBtn from '../components/loadMoreBtn'

const CharactersPage = ({ characters }) => {
	const router = useRouter()
	const [charactersState, setCharactersState] = useState(characters)
	const currentPage = useRef(1)

	const loadNextCharactersPage = () =>
		getNextCharactersPage({
			currentPage: currentPage.current,
			...router.query
		})
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
				{
					charactersState.length < total
					? <LoadMoreBtn loaderFunc={loadNextCharactersPage} />
					: null
				}
			</div>
		</>
	)
}

CharactersPage.getInitialProps = async ({ query }) => {
	const response = await getCharactersList(query)
	return response
}

export default CharactersPage
