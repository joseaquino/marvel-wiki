import marvelRequest from './marvelApi'

export const getCharactersList = async () => {
	const response = await marvelRequest('/characters', {})
	const data = await response.json()
	let characters = []

	if (data.data && data.data.results) {
		characters = data.data.results.map(character => ({
			id: character.id,
			name: character.name,
			thumbnail: character.thumbnail
		}))
	}

	return characters
}
