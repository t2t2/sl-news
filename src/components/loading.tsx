import React from 'react'

const Loading: React.FC = () => (
	<div className="loading">
		<div className="lds-dual-ring" />
		<p className="loading-message">Loading the hottest takes</p>
	</div>
)

export default Loading
