import React, { useState } from 'react'

import FilterBoxBtn from '../buttons/filterBoxBtn'
import SortingBtn from '../buttons/sortingBtn'

const tabs = [
	{ queryKey: 'name', text: 'Name' },
	{ queryKey: 'comic', text: 'Comic' },
	{ queryKey: 'story', text: 'Story' }
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
