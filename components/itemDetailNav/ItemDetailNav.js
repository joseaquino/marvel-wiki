import React from 'react'
import Router from 'next/router'

import ExpandableBtn from '../buttons/expandableBtn'
import BookmarkBtn from '../buttons/bookmarkBtn'
import ArrowLeftIcon from '../icons/ArrowLeft'

const ItemDetailNav = ({ backUrl, onBookmark, text, width, isBookmarked, bookmarkLabel }) => {
	const changeRoute = () => Router.push(backUrl)

	return (
		<div style={{ marginBottom: '24px' }}>
			<ExpandableBtn
				hoverWidth={width}
				text={text}
				icon={ArrowLeftIcon}
				action={changeRoute}
			/>

			<span style={{ float: "right" }}>
				<BookmarkBtn
					isBookmarked={isBookmarked}
					onBookmark={onBookmark}
					label={bookmarkLabel}
				/>
			</span>
		</div>
	)
}

export default ItemDetailNav

