import Result from 'crocks/Result'
import chain from 'crocks/pointfree/chain'
import compose from 'crocks/helpers/compose'
import constant from 'crocks/combinators/constant'
import either from 'crocks/pointfree/either'
import hasProps from 'crocks/predicates/hasProps'
import isArray from 'crocks/predicates/isArray'
import isEmpty from 'crocks/predicates/isEmpty'
import isPromise from 'crocks/predicates/isPromise'
import maybeToResult from 'crocks/Result/maybeToResult'
import not from 'crocks/logic/not'
import propEq from 'crocks/predicates/propEq'
import safe from 'crocks/Maybe/safe'
import traverse from 'crocks/pointfree/traverse'

import { AutocompleteError, SearchResult } from './types'

// ============================================================================
//  Pure Functions
// ============================================================================

// printAutocompleteError :: AutocompleteError -> SearchResult
const printAutocompleteError = (autocompleteError) => {
	const baseMessage = 'AutocompleteInput component failed:\n\t'

	AutocompleteError.case({
		EndpointNotReturnedPromise: () => {
			console.error(`${baseMessage}Prop \`searchEndpoint\` must be a \`Function\` that returns a type \`Promise\` when called.`)
		},
		ResultsNotAnArray: () => {
			console.error(`${baseMessage}Prop \`searchEndpoint\` must be a \`Function\` that returns a \`Promise\` which resolves to a type \`Array\`.`)
		},
		ResultInvalidStructure: () => {
			console.error(`${baseMessage}Prop \`searchEndpoint\` must be a \`Function\` that returns a \`Promise\` which resolves to an \`Array\` containing \`Object\` with required keys \`id\` and \`text\` .`)
		}
	}, autocompleteError)

	return SearchResult.Failed('Failed to load results')
}

// validateEndpoint :: a -> Result AutocompleteError (Promise b)
const validateEndpoint = compose(
	maybeToResult(AutocompleteError.EndpointNotReturnedPromise),
	safe(isPromise)
)

// validateResults :: a -> Result AutocompleteError [SearchResult]
const validateResults = compose(
	chain(
		traverse(
			Result.of,
			compose(
				maybeToResult(AutocompleteError.ResultInvalidStructure),
				safe(hasProps(['id', 'text']))
			)
		)
	),
	maybeToResult(AutocompleteError.ResultsNotAnArray),
	safe(isArray)
)

// makeResults :: [a] -> SearchResult
const makeResults = compose(
	either(
		constant(SearchResult.Failed('No matching results found ')),
		SearchResult.Results
	),
	safe(not(isEmpty))
)

// isEventType :: String -> Event -> Boolean
const isEventType = propEq('type')

// isElementActive :: HTMLElement -> Boolean
const isElementActive = (elem) => document.activeElement === elem

// isKeyCode :: String -> Event -> Boolean
const isKeyCode = propEq('code')

export {
	isElementActive,
	isEventType,
	isKeyCode,
	makeResults,
	printAutocompleteError,
	validateEndpoint,
	validateResults
}
