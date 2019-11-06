import marvelRequest from './marvelApi'

export const getComicsList = async () => {
	const response = await marvelRequest('/comics', {})
	const data = await response.json()
	let comics = []

	if (data.data && data.data.results) {
		comics = data.data.results.map(comic => ({
			id: comic.id,
			title: comic.title,
			thumbnail: comic.thumbnail,
			issueNumber: comic.issueNumber
		}))
	}

	return comics
}
