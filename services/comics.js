import marvelRequest from './marvelApi'

const PER_PAGE = 20

const pickComicValues = comic => ({
			id: comic.id,
			title: comic.title,
			thumbnail: comic.thumbnail,
			issueNumber: comic.issueNumber
})

export const getComicsList = async query => {
	const requestQuery = {
		limit: PER_PAGE,
		orderBy: query.sort === 'up' ? '-issueNumber' : 'issueNumber'
	}

	switch(query.filterBy) {
		case 'format':
			requestQuery.format = query.searchQuery
			break
		case 'title':
			requestQuery.titleStartsWith = query.searchQuery
			break
		case 'issueNumber':
			requestQuery.issueNumber = query.searchQuery
			break
	}

	const response = await marvelRequest('/comics', requestQuery)
	
	const data = await response.json()
	let comics = []

	if (data.data && data.data.results) {
		comics = data.data.results.map(pickComicValues)
	}

	return comics
}

export const getNextComicsPage = query => {
	const requestQuery = {
		offset: query.pageNumber * PER_PAGE,
		orderBy: query.sort === 'up' ? '-issueNumber' : 'issueNumber',
		limit: PER_PAGE
	}

	switch(query.filterBy) {
		case 'format':
			requestQuery.format = query.searchQuery
			break
		case 'title':
			requestQuery.titleStartsWith = query.searchQuery
			break
		case 'issueNumber':
			requestQuery.issueNumber = query.searchQuery
			break
	}

	return marvelRequest('/comics', requestQuery)
		.then(response => response.json())
		.then(comics => 
			comics.data && comics.data.results
			? comics.data.results.map(pickComicValues)
			: []
		)
}
