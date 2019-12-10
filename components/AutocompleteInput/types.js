import Type from 'union-type'

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

// autocompleteError :: EndpointNotReturnedPromise | ResultsNotAnArray | ResultInvalidStructure
const AutocompleteError = Type({
	EndpointNotReturnedPromise: [],
	ResultsNotAnArray: [],
	ResultInvalidStructure: []
})

export {
	AutocompleteError,
	SearchResult
}
