import React from 'react'

/**
 * Common layout for error page
 *
 * @param content {React.ReactElement} Content
 */
export function errorPageLayout(content: React.ReactElement): React.ReactElement {
	return <div className="container">
		<div className="section">
			{content}
		</div>
	</div>
}
