import styled from 'styled-components'

const AutocompleteContainer = styled.div`
	position: relative;
	margin-bottom: 24px;

	::after, ::before {
		position: absolute;
		content: "";
		top: ${({ isOpen }) => (isOpen ? '-6px' : '0')};
		left: ${({ isOpen }) => (isOpen ? '-6px' : '0')};
		z-index: -1;
		right: ${({ isOpen }) => (isOpen ? '-6px' : '0')};
		bottom: ${({ isOpen }) => (isOpen ? '-6px' : '0')};
		border-radius: 10px;
		transition: all 0.2s ease;
	}

	::before {
		opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
		transition: opacity 0.3s ease-in;
		box-shadow: 0 2px 5px rgba(0,0,0,0.15);
	}

	::after {
		background: white;
	}

	&&&& input {
		margin-bottom: 0px;

		${({ isOpen }) => isOpen && ({
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0
		})}
	}

	ul, p {
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
