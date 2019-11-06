import React, { useState } from 'react'

import './LoadMoreBtn.scss'

const LoadMoreBtn = ({ loaderFunc }) => {
	const [loading, setLoadingState] = useState(false)

	const loadMoreItems = () => {
		setLoadingState(true)
		return loaderFunc().then(() => setLoadingState(false))
	}

	return (
		<div className="load-more-btn-container">
			<button
				className={
					loading
					? "load-more-btn loading"
					: "load-more-btn"
				}
				type="button"
				onClick={loadMoreItems}
			>
				{
					loading
					? <div className="loader"><div></div><div></div><div></div><div></div></div>
					: "Load More..."
				}
			</button>
		</div>
	)
}

export default LoadMoreBtn
