import daggy from 'daggy'

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

export { FilterBoxTab }
