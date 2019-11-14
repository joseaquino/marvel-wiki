import React, { useState } from 'react'

import FilterBoxBtn, { FilterBoxTab } from '../buttons/filterBoxBtn'
import SortingBtn from '../buttons/sortingBtn'

const tabs = [
	FilterBoxTab.Text.from({
		label: 'Name',
		queryKey: 'name',
		value: ''
	}),
	FilterBoxTab.Autocomplete.from({
		label: 'Comic',
		queryKey: 'comic',
		value: [],
		dataSrc: x => console.log('Getting Comic titles') || []
	}),
	FilterBoxTab.Autocomplete.from({
		label: 'Story',
		queryKey: 'story',
		value: [],
		dataSrc: x => console.log('Getting Comic story titles') || []
	})
]

const CharactersFilters = () => {
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

export default CharactersFilters
