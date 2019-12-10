import { useState, useRef } from 'react'

const useDebouncedState = (initial, delay) => {
	const [state, setState] = useState(initial)
	const timeoutHandler = useRef(null)

	if (typeof delay !== 'number')
		throw new TypeError('useStateDebounce: You must provide a number as a delay value')

	const debounced = value => {
		clearTimeout(timeoutHandler.current)
		timeoutHandler.current = setTimeout(() => setState(value), delay)
	}

	return [state, debounced]
}

export default useDebouncedState
