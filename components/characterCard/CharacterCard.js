import React from 'react'
import Link from 'next/link'

import './CharacterCard.scss'

const InfoCard = ({ id, name, thumbnail }) => (
	<Link href="/character/[characterID]" as={`/character/${id}`} prefetch={false}>
		<a className="info-card">
			<div className="card-image">
				<span
					style={{ backgroundImage: `url(${thumbnail})`}}
				/>
				<svg
					width="238"
					height="43"
					viewBox="0 0 238 43"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M173.368 12.0802C137.895 22.5396 92.2458 36 0 36V42C92.5 42 137.895 30.4091 173.368 21.4024C195.907 15.6795 214.337 11 238 11V0C214.337 0 195.907 5.43431 173.368 12.0802Z"
						fill="#322543"
					/>
					<path
						d="M173.368 20.4024C137.895 29.4091 92.2458 41 0 41V43H238V10C215 10 195.907 14.6795 173.368 20.4024Z"
						fill="#E7DE10"
					/>
				</svg>
			</div>
	
			<p>{name}</p>
		</a>
	</Link>
)

export default InfoCard
