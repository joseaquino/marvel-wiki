import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import Router, { useRouter } from 'next/router'
import compose from 'crocks/helpers/compose'
import constant from 'crocks/combinators/constant'
import either from 'crocks/pointfree/either'
import equals from 'crocks/pointfree/equals'
import find from 'crocks/Maybe/find'
import getPathOr from 'crocks/helpers/getPathOr'
import getProp from 'crocks/Maybe/getProp'
import map from 'crocks/pointfree/map'
import not from 'crocks/logic/not'
import option from 'crocks/pointfree/option'
import safe from 'crocks/Maybe/safe'
import tap from 'crocks/helpers/tap'
import when from 'crocks/logic/when'

import FilterIcon from '../../icons/FilterIcon'
import ExpandableBtn from '../expandableBtn'
import {
	FilterBoxTab,
	initState,
	makeSearchQuery,
	buildURL
} from './FilterBoxBtn.model'

import './FilterBoxBtn.scss'

const FilterBoxBtn = ({ tabs, isOpen, onBtnClick }) => {
	const router = useRouter()
	const tabList = useRef(tabs)
	const [formError, setFormError] = useState('')
	const [activeTab, setActiveTab] = useState(initState(tabs, router.query))

	const getTabList = () => tabList.current

	const setTabList = newTabList => tabList.current = newTabList

	const showFormError = compose(
		setFormError,
		constant('You must enter a search query')
	)

	const updateTabList = compose(
		setTabList,
		map(when(equals(activeTab), constant(activeTab))),
		getTabList
	)

	const submitSearch = compose(
		either(showFormError, Router.push),
		map(buildURL(router)),
		makeSearchQuery
	)
		
	const handleFilterSubmit = evt => {
		evt.preventDefault()
		submitSearch(activeTab)
	}

	const updateActivetab = compose(
		map(setActiveTab),
		map(tap(updateTabList)),
		safe(not(equals(activeTab)))
	)

	const updateTabValue = compose(
		setActiveTab,
		val => activeTab.map(constant(val)),
		getPathOr('', ['target', 'value'])
	)

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
					{tabList.current.map(tab =>
						<button
							key={tab.queryKey}
							type="button"
							onClick={() => updateActivetab(tab)}
							className={equals(activeTab, tab) ? 'active' : ''}
						>
							{tab.label}
						</button>
					)}
				</div>
				<form onSubmit={handleFilterSubmit}>
					{activeTab.cata({
						Text: (label, _, val) =>
							<input
								label={`Search by ${label}`}
								type="text"
								value={val}
								onChange={updateTabValue}
							/>,
						Dropdown: (label, key, val, opts) =>
							<select
								onChange={updateTabValue}
								defaultValue={val}
							>
								{opts.map((opt, idx) =>
									<option key={idx} value={opt.value}>
										{opt.label}
									</option>
								)}
							</select>,
						Autocomplete: (label, key, val, dataSrc) =>
							<p>Autocomplete box</p>
					})}
					<input type="submit" value="Filter" />
				</form>
			</div>
		</div>
	)
}

const invalidTabTypeError = (propFullname, componentName) => (
	"Invalid prop \`" + propFullname + "\` supplied to \`" + componentName + "\`. " +
	"This prop expects an instance of \`FilterBoxTab\` type."
)

FilterBoxBtn.propTypes = {
	tabs: PropTypes.arrayOf((propVal, key, componentName, location, propFullname) =>
		FilterBoxTab.is(propVal[key])
		? null
		: new Error(invalidTabTypeError(propFullname, componentName))
	).isRequired
}

export default FilterBoxBtn
