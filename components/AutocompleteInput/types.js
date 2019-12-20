import Type from 'union-type'

import constant from 'crocks/combinators/constant'
import isEmpty from 'crocks/predicates/isEmpty'

// ============================================================================
//  Custom Data Types
// ============================================================================

// SearchResult :: Inactive Array | Results Array | Loading | Failed String
const SearchResult = Type({
	Inactive: [Array],
	Results: [Array],
	Loading: [],
	Failed: [String]
})

SearchResult.isLoading = SearchResult.case({
	Loading: constant(true),
	_: constant(false)
})

// autocompleteError :: EndpointNotReturnedPromise | ResultsNotAnArray | ResultInvalidStructure
const AutocompleteError = Type({
	EndpointNotReturnedPromise: [],
	ResultsNotAnArray: [],
	ResultInvalidStructure: []
})

// SearchTerm :: Selected | Modified
const SearchTerm = Type({
	Selected: [String],
	Modified: [String]
})

SearchTerm.isEmpty = SearchTerm.case({
	Selected: isEmpty,
	Modified: isEmpty,
	_: constant(false)
})

SearchTerm.isSelected = SearchTerm.case({
	Selected: constant(true),
	_: constant(false)
})

SearchTerm.isModified = SearchTerm.case({
	Modified: constant(true),
	_: constant(false)
})

export {
	AutocompleteError,
	SearchResult,
	SearchTerm
}
