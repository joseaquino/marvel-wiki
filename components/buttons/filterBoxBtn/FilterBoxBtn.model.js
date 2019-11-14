import and from 'crocks/logic/and'
import applyTo from 'crocks/combinators/applyTo'
import assign from 'crocks/helpers/assign'
import chain from 'crocks/pointfree/chain'
import compose from 'crocks/helpers/compose'
import concat from 'crocks/pointfree/concat'
import constant from 'crocks/combinators/constant'
import converge from 'crocks/combinators/converge'
import curry from 'crocks/helpers/curry'
import daggy from 'daggy'
import defaultProps from 'crocks/helpers/defaultProps'
import find from 'crocks/Maybe/find'
import getProp from 'crocks/Maybe/getProp'
import hasProps from 'crocks/predicates/hasProps'
import isEmpty from 'crocks/predicates/isEmpty'
import isString from 'crocks/predicates/isString'
import liftA2 from 'crocks/helpers/liftA2'
import map from 'crocks/pointfree/map'
import not from 'crocks/logic/not'
import objOf from 'crocks/helpers/objOf'
import option from 'crocks/pointfree/option'
import propEq from 'crocks/predicates/propEq'
import safe from 'crocks/Maybe/safe'
import trim from 'ramda/src/trim'
import { toQueryString } from '../../../services/marvelApi'

// =====================================================
// Data types used by the FilterBoxBtn component
// =====================================================

const FilterBoxTab = daggy.taggedSum('FilterBoxTab', {
	Text: ['label', 'queryKey', 'value'],
	Dropdown: ['label', 'queryKey', 'value', 'options'],
	Autocomplete: ['label', 'queryKey', 'value', 'dataSrc']
})

// equals :: a -> Boolean
FilterBoxTab.prototype.equals = function equals(otherTab) {
	return this.cata({
		Text: (_, key) =>
			FilterBoxTab.Text.is(otherTab) && otherTab.queryKey === key,
		Dropdown: (_, key) =>
			FilterBoxTab.Dropdown.is(otherTab) && otherTab.queryKey === key,
		Autocomplete: (_, key) =>
			FilterBoxTab.Autocomplete.is(otherTab) && otherTab.queryKey === key
	})
}

// map :: (a -> b) -> FilterBoxTab
FilterBoxTab.prototype.map = function map(fn) {
	return this.cata({
		Text: (label, key, val) =>
			FilterBoxTab.Text(label, key, fn(val)),
		Dropdown: (label, key, val, opts) =>
			FilterBoxTab.Dropdown(label, key, fn(val), opts),
		Autocomplete: (label, key, val, dSrc) =>
			FilterBoxTab.Autocomplete(label, key, fn(val), dSrc)
	})
}

// =====================================================
// Logic of the FilterBoxBtn component
// =====================================================

// getActiveTabFromQuery :: [FilterBoxTab] -> NextRouter -> Maybe FilterBoxTab
const getActiveTabFromQuery = curry((tabs, { filterBy, searchQuery }) =>
	find(
		propEq('queryKey', filterBy),
		tabs
	)
	.map(map(constant(searchQuery)))
)

// filterQueryIsDefined :: Object -> Maybe Object
const filterQueryIsDefined = safe(
	compose(
		isString,
		option(null),
		getProp('filterBy')
	)
)

// safeStringValue :: a -> Maybe String
const safeStringValue = compose(
	safe(and(isString, not(isEmpty))),
	trim
)

// makeSearchQuery :: Object -> Maybe Query
const makeSearchQuery = converge(
	liftA2(assign),
	compose(
		map(objOf('searchQuery')),
		chain(safeStringValue),
		getProp('value')
	),
	compose(
		map(objOf('filterBy')),
		getProp('queryKey')
	)
)

// buildURL :: NextRouter -> Query -> String
const buildURL = curry(router => compose(
	applyTo(router.pathname),
	concat,
	toQueryString,
	defaultProps(router.query),
))

// initState :: [FilterBoxTab] -> Query -> FilterBoxBtnState
const initState = curry((tabs, query) =>
	safe(hasProps(['filterBy', 'searchQuery']), query)
	.chain(filterQueryIsDefined)
	.chain(getActiveTabFromQuery(tabs))
	.alt(getProp(0, tabs))
	.option({}))

export {
	FilterBoxTab,
	buildURL,
	initState,
	makeSearchQuery,
}
