import marvelRequest from './marvelApi'

const PER_PAGE = 20;

const pickCharacterData = character => ({
	id: character.id,
	name: character.name,
	thumbnail: character.thumbnail
})

export const getCharactersList = async () => {
	const response = await marvelRequest('/characters', {})
	const data = await response.json()
	let characters = []

	if (data.data && data.data.results) {
		characters = data.data.results.map(pickCharacterData)
	}

	return characters
}

export const getNextCharactersPage = pageNumber =>
	marvelRequest('/characters', { offset: pageNumber * PER_PAGE })
		.then(response => response.json())
		.then(data =>
			data.data && data.data.results
			? data.data.results.map(pickCharacterData)
			: []
		)
