import marvelRequest, { urlHttpToHttps } from './marvelApi'
import { pickComicValues } from './comics'

const PER_PAGE = 20;

export const pickCharacterValues = character => ({
	id: character.id,
	name: character.name,
	thumbnail: `${urlHttpToHttps(character.thumbnail.path)}.${character.thumbnail.extension}`,
	description: character.description,
	stories: character.stories.items.map(story => story.name),
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
		characters = data.data.results.map(pickCharacterValues)
	}

	return { characters, total: data.data ? data.data.total : Infinity }
}

export const getCharacter = async id => {
	const response = await marvelRequest(`/characters/${id}`, {})
	const character = await response.json()

	let characterDetails = {
		stories: [],
	}

	const results = character.data && character.data.results[0] ? character.data.results[0] : null

	if (results) {
		characterDetails = pickCharacterValues(results)
	}

	return characterDetails
}

export const getCharacterComics = id => {
	return marvelRequest(`/characters/${id}/comics`, {})
		.then(response => response.json())
		.then(comics => comics.data && comics.data.results ? comics.data.results : null)
		.then(results => {
			let comicDetails = []

			if (results)
				comicDetails = results.map(pickComicValues)

			return comicDetails
		})
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
			? data.data.results.map(pickCharacterValues)
			: []
		)
}
