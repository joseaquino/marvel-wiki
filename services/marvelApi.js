import fetch from 'isomorphic-unfetch'

const ENDPOINT = 'https://gateway.marvel.com/v1/public'
const MARVEL_PUBLIC_KEY = '16e3fbbdd135689b2c9aa8550fb8efbc'

// generateAuthQuery :: () -> Object
const generateAuthQuery = () => {
	let authQuery = {}

	if(typeof window === 'undefined') {
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

// urlHttpToHttps :: String -> String
export const urlHttpToHttps = url => url.replace(/^http:\/\//i, 'https://')

// toQueryString :: Object -> String
export const toQueryString = obj => {
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
	const url = `${ENDPOINT}${path}${toQueryString(query)}`

	return fetch(url)
}

export default requestFromMarvel
