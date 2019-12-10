import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'

import and from 'crocks/logic/and'
import compose from 'crocks/helpers/compose'
import constant from 'crocks/combinators/constant'
import either from 'crocks/pointfree/either'
import getPathOr from 'crocks/helpers/getPathOr'
import ifElse from 'crocks/logic/ifElse'
import isEmpty from 'crocks/predicates/isEmpty'
import map from 'crocks/pointfree/map'
import not from 'crocks/logic/not'
import or from 'crocks/logic/or'
import tap from 'crocks/helpers/tap'
import then from 'ramda/src/then'
import unit from 'crocks/helpers/unit'
import when from 'crocks/logic/when'

import { SearchResult } from './types'
import {
	isElementActive,
	isEventType,
	isKeyCode,
	makeResults,
	printAutocompleteError,
	validateEndpoint,
	validateResults
} from './model'
import useDebouncedState from '../../hooks/useDebouncedState'
import AutocompleteContainer from './styles'

// ============================================================================
//  AutocompleteInput Component Definition
// ============================================================================

const AutocompleteInput = (props) => {
	const {
		searchEndpoint,
		label,
		onResultSelect,
		delay,
		initialValue
	} = props

	const [searchResults, setSearchResults] = useState(SearchResult.Inactive([]))
	const [searchTerm, setSearchTerm] = useDebouncedState(initialValue, delay)
	const searchTermElem = useRef(null)

	// showErrorMessage :: AutocompleteError -> ()
	const showErrorMessage = compose(
		setSearchResults,
		printAutocompleteError
	)

	// getSearchResults :: () -> SearchResult
	const getSearchResults = constant(searchResults)

	// getSearchTerm :: () -> String
	const getSearchTerm = constant(searchTerm)

	// updateResults :: a -> ()
	const updateResults = compose(
		either(showErrorMessage, setSearchResults),
		map(makeResults),
		validateResults
	)

	// submitSearch :: String -> ()
	const submitSearch = compose(
		either(showErrorMessage, then(updateResults)),
		validateEndpoint,
		searchEndpoint
	)

	// isSearchTermElemActive :: () -> Boolean
	const isSearchTermElemActive = () => isElementActive(searchTermElem.current)

	// isSearchTermEmpty :: () -> Boolean
	const isSearchTermEmpty = compose(
		isEmpty,
		getSearchTerm
	)

	const showLoadingState = () => setSearchResults(SearchResult.Loading)

	const clearSearchResult = compose(
		SearchResult.case({
			Results: compose(setSearchResults, SearchResult.Inactive),
			Inactive: unit,
			_: compose(setSearchResults, SearchResult.Inactive, constant([]))
		}),
		getSearchResults
	)

	// hideResults :: Event -> ()
	const hideResults = when(
		or(
			and(isEventType('click'), not(isSearchTermElemActive)),
			and(isEventType('keyup'), isKeyCode('Escape'))
		),
		clearSearchResult
	)

	// showResults :: () -> ()
	const showResults = when(
		and(isSearchTermElemActive, not(isSearchTermEmpty)),
		compose(
			SearchResult.case({
				Inactive: compose(setSearchResults, SearchResult.Results),
				_: unit
			}),
			getSearchResults
		)
	)

	// addHideResultsListener :: () -> (() -> ())
	const addHideResultsListener = () => {
		document.addEventListener('click', hideResults, true)
		document.addEventListener('keyup', hideResults, true)

		return () => {
			document.removeEventListener('click', hideResults, true)
			document.removeEventListener('keyup', hideResults, true)
		}
	}

	// handleInputChange :: Event -> ()
	const handleInputChange = compose(
		setSearchTerm,
		when(
			not(isEmpty),
			tap(showLoadingState)
		),
		getPathOr('', ['target', 'value'])
	)

	useEffect(() => searchResults.case({
		Inactive: unit,
		_: addHideResultsListener
	}), [searchResults])

	useEffect(() => {
		ifElse(
			isEmpty,
			clearSearchResult,
			submitSearch,
			searchTerm
		)
	}, [searchTerm])

	return (
		<AutocompleteContainer
			isOpen={SearchResult.case({
				Inactive: constant(false),
				_: constant(true)
			}, searchResults)}
		>
			<input
				label={`Search by ${label}`}
				type="text"
				onChange={handleInputChange}
				onClick={showResults}
				ref={searchTermElem}
			/>
			{searchResults.case({
				Loading: () => (
					<p>Searching...</p>
				),
				Results: (results) => (
					<ul className="autocomplete-results">
						{results.map((result) => (
							<li key={result.id}>
								<button
									type="button"
									onClick={() => onResultSelect(result)}
								>
									{result.text}
								</button>
							</li>
						))}
					</ul>
				),
				Failed: (message) => (
					<p>{message}</p>
				),
				Inactive: constant(null)
			})}
		</AutocompleteContainer>
	)
}

// ============================================================================
//  AutocompleteInput Component Props Defaults and Validation
// ============================================================================

AutocompleteInput.defaultProps = {
	onResultSelect: unit,
	delay: 500,
	initialValue: ''
}

AutocompleteInput.propTypes = {
	searchEndpoint: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	onResultSelect: PropTypes.func,
	delay: PropTypes.number,
	initialValue: PropTypes.string
}

export default AutocompleteInput
