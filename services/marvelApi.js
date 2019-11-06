import fetch from 'isomorphic-unfetch'

const ENDPOINT = 'https://gateway.marvel.com/v1/public'
const MARVEL_PUBLIC_KEY = '2cddd9e7f4e354a7d3c9fc141e9d9292'

// generateAuthQuery :: () -> Object
const generateAuthQuery = () => {
	let authQuery = {}

	if(process.browser === false) {
		const ts = Date.now()
		const privateKey = process.env.MARVEL_PRIVATE_KEY
		const crypto = require('crypto')
		const hash = crypto.createHash('md5').update(`${ts}${privateKey}${MARVEL_PUBLIC_KEY}`).digest('hex')

		authQuery = { ts, apikey: MARVEL_PUBLIC_KEY, hash }
	} else {
		authQuery = { apikey: MARVEL_PUBLIC_KEY }
	}

	return authQuery
}

// queryToString :: Object -> String
const queryToString = obj => {
	const keys = Object.keys(obj)
	let queryString = '?'

	for(let i = 0; i < keys.length; i++) {
		let str = `${keys[i]}=${obj[keys[i]]}`
		queryString += i === (keys.length - 1) ? str : str + '&'
	}

	return queryString
}

// requestFromMarvel :: String -> Object -> Promise
const requestFromMarvel = (path, query) => {
	query = Object.assign(query, generateAuthQuery())
	const url = `${ENDPOINT}${path}${queryToString(query)}`

	return fetch(url)
}

export default requestFromMarvel
