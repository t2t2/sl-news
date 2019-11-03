import React from 'react'
import {Link} from 'react-router-dom'

const ErrorComponent: React.FC<{
	error?: Error;
	message?: string;
	isHome?: boolean;
}> = ({error, isHome, message}) => {
	if (error && !message) {
		message = error.message
	}

	return (
		<div className="error-message">
			{message ? (
				<p>{message}</p>
			) : (
				<p>
					Some unknown error happened <span role="img" aria-label="sad">😢</span>
				</p>
			)}
			{isHome ? null : (
				<p>
					<Link
						to="/"
					>Let's go back home and try again</Link>
				</p>
			)}
		</div>
	)
}

export default ErrorComponent
