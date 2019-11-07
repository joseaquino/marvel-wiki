const STORAGE_KEY = 'marvelWikiBookmarks'

const _loaded = false

let _bookmarks = {
	comics: [],
	characters: []
}

export const getBookmarks = () => {
	if (process.browser && !_loaded) {
		const fromStorage = localStorage.getItem(STORAGE_KEY)
		_bookmarks = fromStorage ? JSON.parse(fromStorage) : _bookmarks
		_loaded = true
	}

	return _bookmarks
}

const isBookmarked = (type, id) => {
	const bookmarks = getBookmarks()

	return (
		bookmarks[type]
		? bookmarks[type].reduce(
			(hasMatchFound, bookmark) =>
			!hasMatchFound && bookmark.id === id, false
		)
		: false
	)
}

const saveBookmarks = bookmarks => {
	if (process.browser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
	}
	_bookmarks = bookmarks
}

export const isComicBookmarked = id => isBookmarked('comics', id)

export const addComicToBookmarks = comic => {
	if (!isComicBookmarked(comic.id)) {
		let bookmarks = getBookmarks()
		saveBookmarks({
			...bookmarks,
			comics: bookmarks.comics.concat(comic)
		})
	}
}

export const removeComicBookmark = id => {
	const bookmarks = getBookmarks()
	saveBookmarks({
		...bookmarks,
		comics: bookmarks.comics.filter(comic => comic.id !== id)
	})
}
