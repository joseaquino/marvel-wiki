const STORAGE_KEY = 'marvelWikiBookmarks'

const CHARACTERS_KEY = 'characters'
const COMIC_KEY = 'comics'

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

const toggleBookmark = type => value => {
	if (isBookmarked(type)(value.id)) {
		removeABookmark(type)(value.id)
	} else {
		addToBookmarks(type)(value)
	}
}

const saveBookmarks = bookmarks => {
	if (process.browser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
	}
	_bookmarks = bookmarks
}

export const isComicBookmarked = isBookmarked(COMIC_KEY)

export const addComicToBookmarks = addToBookmarks(COMIC_KEY)

export const removeComicBookmark = removeABookmark(COMIC_KEY)

export const toggleComicBookmark = toggleBookmark(COMIC_KEY)

export const isCharacterBookmarked = isBookmarked(CHARACTERS_KEY)

export const addCharacterToBookmarks = addToBookmarks(CHARACTERS_KEY)

export const removeCharacterBookmark = removeABookmark(CHARACTERS_KEY)

export const toggleCharacterBookmark = toggleBookmark(CHARACTERS_KEY)

export const removeMarkedBookmarks = bookmarks => {
	const comics = bookmarks.comics.filter(bookmark => bookmark.markedForRemoval)
	const characters = bookmarks.characters.filter(character => character.markedForRemoval)

	comics.map(comic => comic.id).map(removeABookmark(COMIC_KEY))
	characters.map(character => character.id).map(removeABookmark(CHARACTERS_KEY))
}
