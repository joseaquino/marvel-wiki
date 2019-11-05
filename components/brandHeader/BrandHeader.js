import React from "react";
import Link from 'next/link'

import './BrandHeader.scss'

const BrandHeader = () => (
	<div className="brand-header">
		<Link href="/">
			<a className="brand-logo">
				<img src={require('../../assets/images/marvel-logo.svg')} alt="Marvel comics logo image"/>
			</a>
		</Link>
		<div id="progress-bar" />
	</div>
);

export default BrandHeader
