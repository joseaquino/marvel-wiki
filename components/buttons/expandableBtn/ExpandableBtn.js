import React, { useState } from 'react'

import './ExpandableBtn.scss'

const ExpandableBtn = ({ hoverWidth, text, icon, action, keepOpen }) => {
	const Icon = icon
	const defaultWidth = '48px'
	const [width, setWidth] = useState(defaultWidth)

	const expandButton = () => setWidth(hoverWidth)

	const contractButton = () => keepOpen ? null : setWidth(defaultWidth)

	const callAction = () =>
		typeof(action) === 'function'
			? action()
			: null

	return (
		<button
			className="expandable-btn"
			type="button"
			onClick={callAction}
			onMouseEnter={expandButton}
			onFocus={expandButton}
			onBlur={contractButton}
			onMouseLeave={contractButton}
			style={{ width }}
			aria-label="text"
		>
			<div className="btn-icon"><Icon /></div>
			<span>{text}</span>
		</button>
	)
}

export default ExpandableBtn
