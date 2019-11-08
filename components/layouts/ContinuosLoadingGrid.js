import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import useDidUpdate from '../../services/useDidUpdateHook'
import LoadMoreBtn from '../buttons/loadMoreBtn'

const ContinousLoadingGrid = ({ cards, total, onLoadMore, cardItemRender }) => {
	const router = useRouter()
	const currentPage = useRef(1)
	const CardItem = cardItemRender
	const [cardsState, setCardsState] = useState(cards)

	useDidUpdate(() => setCardsState(cards), [cards])

	const getQuery = () => ({
		currentPage: currentPage.current,
		...router.query
	}) 

	const concatNewCards = nextSetOfCards =>
		setCardsState(cardsState.concat(nextSetOfCards))

	const increasePageNum = () =>
		currentPage.current = currentPage.current + 1

	const loadNextSetOfCards = () =>
		onLoadMore(getQuery()).then(concatNewCards).then(increasePageNum)

	return (
		<div className="main-container" role="main">
			<div className="info-cards">
				{
					cardsState.map((cardProps, idx) => <CardItem key={idx} {...cardProps} />)
				}
			</div>
			{
				cardsState.length < total
					? <LoadMoreBtn loaderFunc={loadNextSetOfCards} />
					: null
			}
		</div>
	)
}

export default ContinousLoadingGrid
