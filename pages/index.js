import { getCharactersList } from '../services/characters'

const makeCharacterCard = ({ id, name, thumbnail }) => (
	<div key={id} className="character-card">
		<h1>{name}</h1>
		<img src={`${thumbnail.path}.${thumbnail.extension}`} />
	</div>
)

const CharactersPage = ({ characters }) => characters.map(makeCharacterCard)

CharactersPage.getInitialProps = async () => {
	const characters = await getCharactersList()
	return { characters }
}

export default CharactersPage
