import { getCharactersList } from '../services/characters'
import InfoCard from '../components/infoCard'

const CharactersPage = ({ characters }) => {
	return (
		<div className="main-container">
			<div className="info-cards">
				{
					characters.map(({ id, name, thumbnail }) => (
						<InfoCard
							id={id}
							name={name}
							thumbnail={thumbnail}
						/>
					))
				}
			</div>
		</div>
	)
}

CharactersPage.getInitialProps = async () => {
	const characters = await getCharactersList()
	return { characters }
}

export default CharactersPage
