import React from 'react'
import Link from 'next/link'

import './ComicCard.scss'

const ComicCard = ({ id, title, thumbnail, issueNumber }) => (
	<Link href="/comic/[comicID]" as={`/comic/${id}`} prefetch={false}>
		<a className="comic-card">
			<div className="comic-portrait-frame">
				<div
					className="comic-portrait"
					style={{ backgroundImage: `url(${thumbnail.path}.${thumbnail.extension})`}}
				/>
			</div>
			<div className="comic-details">
				<span className="issue-number">Issue Number {issueNumber}</span>
				<p>{title}</p>
			</div>
		</a>
	</Link>
)

export default ComicCard
