import styled from 'styled-components'

const AutocompleteContainer = styled.div`
	position: relative;
	margin-bottom: 24px;

	&&&& input {
		margin-bottom: 0px;

		${({ isOpen }) => isOpen && ({
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0
		})}
	}

	ul, p {
		position: absolute;
		left: 0; top: 100%;
		background-color: white;
		width: 100%;
		box-sizing: border-box;
		border-radius: 0 0 6px 6px;
	}

	ul {
		max-height: 180px;
		overflow: scroll;
	}

	p {
		padding: 12px 8px;
	}

	button {
		background: none;
		border: none;
		width: 100%;
		padding: 12px 0;
	}

	button:hover {
		cursor: pointer;
		background-color: #CECECE;
	}
`

export default AutocompleteContainer
