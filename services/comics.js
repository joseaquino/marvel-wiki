import marvelRequest from './marvelApi'

const PER_PAGE = 20

const pickComicValues = comic => ({
			id: comic.id,
			title: comic.title,
			thumbnail: comic.thumbnail,
			issueNumber: comic.issueNumber
})

export const getComicsList = async () => {
	const response = await marvelRequest('/comics', {})
	const data = await response.json()
	let comics = []

	if (data.data && data.data.results) {
		comics = data.data.results.map(pickComicValues)
	}

	return comics
}

export const getNextComicsPage = pageNumber =>
	marvelRequest('/comics', { offset: pageNumber * PER_PAGE })
		.then(response => response.json())
		.then(comics => 
			comics.data && comics.data.results
			? comics.data.results.map(pickComicValues)
			: []
		)
