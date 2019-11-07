const STORAGE_KEY = 'marvelWikiBookmarks'

let _loaded = false

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

const isBookmarked = type => id => {
	const bookmarks = getBookmarks()

	return (
		bookmarks[type]
		? bookmarks[type].reduce(
			(hasMatchFound, bookmark) =>
				hasMatchFound || bookmark.id === id,
			false
		)
		: false
	)
}

const addToBookmarks = type => value => {
	if (!isBookmarked(type)(value.id)) {
		let bookmarks = getBookmarks()
		saveBookmarks({
			...bookmarks,
			[type]: bookmarks[type].concat(value)
		})
	}
}


const removeABookmark = type => id => {
	const bookmarks = getBookmarks()
	saveBookmarks({
		...bookmarks,
		[type]: bookmarks[type].filter(mark => mark.id !== id)
	})
}

const saveBookmarks = bookmarks => {
	if (process.browser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
	}
	_bookmarks = bookmarks
}

export const isComicBookmarked = isBookmarked('comics')

export const addComicToBookmarks = addToBookmarks('comics')

export const removeComicBookmark = removeABookmark('comics')

export const isCharacterBookmarked = isBookmarked('characters')

export const addCharacterToBookmarks = addToBookmarks('characters')

export const removeCharacterBookmark = removeABookmark('characters')
