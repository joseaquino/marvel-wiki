import marvelRequest, { urlHttpToHttps } from './marvelApi'

import { pickCharacterValues } from './characters'

const PER_PAGE = 20

export const pickComicValues = (comic) => ({
	id: comic.id,
	title: comic.title,
	thumbnail: `${urlHttpToHttps(comic.thumbnail.path)}.${comic.thumbnail.extension}`,
	issueNumber: comic.issueNumber,
	description: comic.description,
	stories: comic.stories.items.map((story) => story.name)
})

export const getComicsList = async (query) => {
	const requestQuery = {
		limit: PER_PAGE,
		orderBy: query.sort === 'up' ? '-issueNumber' : 'issueNumber'
	}

	switch (query.filterBy) {
		case 'format':
			requestQuery.format = query.searchQuery
			break
		case 'title':
			requestQuery.titleStartsWith = query.searchQuery
			break
		case 'issueNumber':
			requestQuery.issueNumber = query.searchQuery
			break
		default:
			break
	}

	const response = await marvelRequest('/comics', requestQuery)

	const data = await response.json()
	let comics = []

	if (data.data && data.data.results) {
		comics = data.data.results.map(pickComicValues)
	}

	return { comics, total: data.data ? data.data.total : Infinity }
}

export const getComic = async (id) => {
	const response = await marvelRequest(`/comics/${id}`, {})
	const comic = await response.json()

	let comicDetails = {
		stories: []
	}

	const results = comic.data && comic.data.results[0] ? comic.data.results[0] : null

	if (results) {
		comicDetails = pickComicValues(results)
	}

	return comicDetails
}

export const getComicCharacters = (id) => marvelRequest(`/comics/${id}/characters`, {})
	.then((response) => response.json())
	.then((characters) => (
		characters.data && characters.data.results
			? characters.data.results
			: null
	))
	.then((results) => {
		let charactersDetails = []

		if (results) {
			charactersDetails = results.map(pickCharacterValues)
		}

		return charactersDetails
	})

export const getNextComicsPage = (query) => {
	const requestQuery = {
		offset: query.pageNumber * PER_PAGE,
		orderBy: query.sort === 'up' ? '-issueNumber' : 'issueNumber',
		limit: PER_PAGE
	}

	switch (query.filterBy) {
		case 'format':
			requestQuery.format = query.searchQuery
			break
		case 'title':
			requestQuery.titleStartsWith = query.searchQuery
			break
		case 'issueNumber':
			requestQuery.issueNumber = query.searchQuery
			break
		default:
			break
	}

	return marvelRequest('/comics', requestQuery)
		.then((response) => response.json())
		.then((comics) => (
			comics.data && comics.data.results
				? comics.data.results.map(pickComicValues)
				: []
		))
}
