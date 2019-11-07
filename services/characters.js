import marvelRequest from './marvelApi'

const PER_PAGE = 20;

const pickCharacterData = character => ({
	id: character.id,
	name: character.name,
	thumbnail: character.thumbnail
})

export const getCharactersList = async query => {
	const requestQuery = {
		limit: PER_PAGE,
		orderBy: query.sort === 'up' ? '-name' : 'name'
	}

	switch(query.filterBy) {
		case 'name':
			requestQuery.nameStartsWith = query.searchQuery
			break
		case 'comic':
			requestQuery.comics = query.searchQuery
			break
		case 'story':
			requestQuery.stories = query.searchQuery
			break
	}

	const response = await marvelRequest('/characters', requestQuery)

	const data = await response.json()
	let characters = []

	if (data.data && data.data.results) {
		characters = data.data.results.map(pickCharacterData)
	}

	return characters
}

export const getNextCharactersPage = query => {
	const requestQuery = {
		limit: PER_PAGE,
		offset: query.currentPage ? query.currentPage * PER_PAGE : 0,
		orderBy: query.sort && query.sort === 'up' ? '-name' : 'name'
	}

	switch(query.filterBy) {
		case 'name':
			requestQuery.nameStartsWith = query.searchQuery
			break
		case 'comic':
			requestQuery.comics = query.searchQuery
			break
		case 'story':
			requestQuery.stories = query.searchQuery
			break
	}

	return marvelRequest('/characters', requestQuery)
		.then(response => response.json())
		.then(data =>
			data.data && data.data.results
			? data.data.results.map(pickCharacterData)
			: []
		)
}
