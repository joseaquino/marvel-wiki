import React, { useState } from 'react'

import FilterBoxBtn from '../buttons/filterBoxBtn'
import SortingBtn from '../buttons/sortingBtn'

const tabs = [
	{ queryKey: 'format', text: 'Format' },
	{ queryKey: 'title', text: 'Title' },
	{ queryKey: 'issueNumber', text: 'Issue #' }
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
