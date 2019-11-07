import React, { useRef, useState } from 'react'
import Router, { useRouter } from 'next/router'

import FilterIcon from '../../icons/FilterIcon'
import ExpandableBtn from '../expandableBtn'

import { toQueryString } from '../../../services/marvelApi'

import './FilterBoxBtn.scss'

const FilterBoxBtn = ({ tabs, isOpen, onBtnClick }) => {
	const router = useRouter()
	const workingTabs = useRef(tabs)
	const [activeTab, setActiveTab] = useState(() => {
		let tabActiveFromQuery = workingTabs.current.reduce(
			(active, tab) => {
				if (router.query.filterBy === tab.queryKey) {
					return {...tab, value: router.query.searchQuery }
				}

				return active
			},
			null
		)

		if (tabActiveFromQuery === null && workingTabs.current[0]) {
			return workingTabs.current[0]
		} else if (tabActiveFromQuery) {
			return tabActiveFromQuery
		} else {
			return {}
		}
	})

	const handleFilterSubmit = evt => {
		evt.preventDefault()

		if (activeTab.value && activeTab.value.trim() !== '') { 
			const query = {
				...router.query,
				filterBy: activeTab.queryKey,
				searchQuery: activeTab.value
			}
			const url = `${router.pathname}${toQueryString(query)}`
			Router.push(url)
		}
	}

	const updateActivetab = selectedTab => {
		if (activeTab.queryKey !== selectedTab.queryKey) {
			workingTabs.current = workingTabs.current.map(tab => tab.queryKey === activeTab.queryKey ? activeTab : tab)
			setActiveTab(selectedTab)
		}
	}

	const updateTabValue = evt => setActiveTab({ ...activeTab, value: evt.target.value })

	return (
		<div className="filter-box-container">
			<ExpandableBtn
				hoverWidth="154px"
				text="Filter by:"
				icon={FilterIcon}
				action={onBtnClick}
				keepOpen={isOpen}
			/>
			<div className={ isOpen ? "filter-box filter-box-open" : "filter-box" }>
				<div className="filter-box-tabs">
					{
						workingTabs.current.map(tab =>
							<button
								key={tab.queryKey}
								type="button"
								onClick={() => updateActivetab(tab)}
								className={activeTab.queryKey === tab.queryKey ? 'active' : ''}
							>
								{ tab.text }
							</button>
						)
					}
				</div>
				<form onSubmit={handleFilterSubmit}>
					<input
						type="text"
						value={activeTab.value ? activeTab.value : ''}
						onChange={updateTabValue}
					/>
					<input type="submit" value="Filter" />
				</form>
			</div>
		</div>
	)
}

export default FilterBoxBtn
