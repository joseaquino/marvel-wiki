import React from 'react'
import Router from 'next/router'

import ExpandableBtn from '../buttons/expandableBtn'
import ArrowLeftIcon from '../icons/ArrowLeft'
import BookmarkIcon from '../icons/Bookmark'

import './ItemDetailNav.scss'

const ItemDetailNav = ({ backUrl, onBookmark }) => {
	const changeRoute = () => Router.push(backUrl)

	return (
		<div className="item-detail-nav">
			<ExpandableBtn
				hoverWidth="215px"
				text="Back to Comics"
				icon={ArrowLeftIcon}
				action={changeRoute}
			/>

			<button type="button" onClick={onBookmark}>
				<BookmarkIcon />
			</button>
		</div>
	)
}

export default ItemDetailNav

