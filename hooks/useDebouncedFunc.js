import { useRef } from 'react'

const useDebouncedFunc = (fn, delay) => {
	const timeoutHandler = useRef(null)

	if (typeof delay !== 'number') {
		throw new TypeError('useDebouncedFunc: You must provide a number as the second paramenter')
	}

	if (typeof fn !== 'function') {
		throw new TypeError('useDebouncedFunc: You must provide a function as the first parameter')
	}

	function debounced(...args) {
		const later = () => {
			timeoutHandler.current = null
			fn.apply(this, args)
		}
		clearTimeout(timeoutHandler.current)
		timeoutHandler.current = setTimeout(later, delay)
	}

	return debounced
}

export default useDebouncedFunc
