import React, { useState } from 'react'

import FilterBoxBtn, { FilterBoxTab } from '../buttons/filterBoxBtn'
import SortingBtn from '../buttons/sortingBtn'

const tabs = [
	FilterBoxTab.Dropdown.from({
		label: 'Format',
		queryKey: 'format',
		value: '',
		options: [
			{ value: 'comic', label: 'Comic' },
			{ value: 'magazine', label: 'Magazine' },
			{ value: 'trade paperback', label: 'Trade Paperback' },
			{ value: 'hardcover', label: 'Hardcover' },
			{ value: 'digest', label: 'Digest' },
			{ value: 'graphic novel', label: 'Graphic Novel' },
			{ value: 'digital comic', label: 'Digital Comic' },
			{ value: 'infinite comic', label: 'Infinite Comic' }
		]
	}),
	FilterBoxTab.Text.from({
		label: 'Title',
		queryKey: 'title',
		value: ''
	}),
	FilterBoxTab.Text.from({
		label: 'Issue #',
		queryKey: 'issueNumber',
		value: ''
	})
]

const ComicsFilters = () => {
	const [filterBoxOpen, setFilterBoxStatus] = useState(false)

	return (
		<div className="filter-container">
			<FilterBoxBtn
				tabs={tabs}
				isOpen={filterBoxOpen}
				onBtnClick={() => setFilterBoxStatus(!filterBoxOpen)}
			/>
			<SortingBtn />
		</div>
	)
}

export default ComicsFilters
