import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'

import and from 'crocks/logic/and'
import compose from 'crocks/helpers/compose'
import constant from 'crocks/combinators/constant'
import either from 'crocks/pointfree/either'
import getPathOr from 'crocks/helpers/getPathOr'
import getProp from 'crocks/Maybe/getProp'
import ifElse from 'crocks/logic/ifElse'
import isEmpty from 'crocks/predicates/isEmpty'
import isFunction from 'crocks/predicates/isFunction'
import isString from 'crocks/predicates/isString'
import map from 'crocks/pointfree/map'
import not from 'crocks/logic/not'
import option from 'crocks/pointfree/option'
import or from 'crocks/logic/or'
import tap from 'crocks/helpers/tap'
import then from 'ramda/src/then'
import unit from 'crocks/helpers/unit'
import when from 'crocks/logic/when'

import { SearchResult, SearchTerm } from './types'
import {
	isElementActive,
	isEventType,
	isKeyCode,
	makeResults,
	printAutocompleteError,
	validateEndpoint,
	validateResults
} from './model'
import useDebouncedFunc from '../../hooks/useDebouncedFunc'
import AutocompleteContainer from './styles'

// ============================================================================
//  AutocompleteInput Component Definition
// ============================================================================

const COMPONENT_NAME = 'autocomplete-input'

const AutocompleteInput = (props) => {
	const {
		searchEndpoint,
		label,
		onResultSelect,
		delay,
		initialValue
	} = props

	const [searchResults, setSearchResults] = useState(SearchResult.Inactive([]))
	const [searchTerm, setSearchTerm] = useState(SearchTerm.Modified(initialValue))
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
	const submitSearch = useDebouncedFunc(compose(
		either(
			showErrorMessage,
			then(updateResults)
		),
		validateEndpoint,
		searchEndpoint
	), delay)

	// isSearchTermElemActive :: () -> Boolean
	const isSearchTermElemActive = () => isElementActive(searchTermElem.current)

	// isSearchTermEmpty :: () -> Boolean
	const isSearchTermEmpty = compose(
		SearchTerm.case({
			_: isEmpty
		}),
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

	const elemChildOfComponent = (elem) => (isFunction(elem.closest) ? elem.closest(`[name='${COMPONENT_NAME}'`) !== null : false)

	// hideResults :: Event -> ()
	const hideResults = when(
		or(
			and(isEventType('click'), compose(option(true), map(not(elemChildOfComponent)), getProp('target'))),
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

	const handleResultSelection = compose(
		setSearchTerm,
		ifElse(
			isString,
			SearchTerm.Selected,
			constant(SearchTerm.Selected(''))
		),
		onResultSelect
	)

	// handleInputChange :: Event -> ()
	const handleInputChange = compose(
		setSearchTerm,
		SearchTerm.Modified,
		when(
			and(
				not(isEmpty),
				compose(
					not(SearchResult.isLoading),
					getSearchResults
				)
			),
			tap(showLoadingState)
		),
		getPathOr('', ['target', 'value'])
	)

	useEffect(() => searchResults.case({
		Inactive: unit,
		_: addHideResultsListener
	}), [searchResults])

	useEffect(() => {
		SearchTerm.case({
			Selected: clearSearchResult,
			Modified: ifElse(isEmpty, clearSearchResult, submitSearch)
		}, searchTerm)
	}, [searchTerm])

	return (
		<AutocompleteContainer
			isOpen={SearchResult.case({
				Inactive: constant(false),
				_: constant(true)
			}, searchResults)}
			name={COMPONENT_NAME}
		>
			<input
				label={`Search by ${label}`}
				type="text"
				value={searchTerm[0]}
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
									onClick={() => handleResultSelection(result)}
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
