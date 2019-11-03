import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import {ApolloProvider} from '@apollo/react-hooks'

import Routes from './routes'
import client from './api/client'

const App: React.FC = () => (
	<Router>
		<ApolloProvider client={client}>
			<div className="app">
				<header className="app-header">
					<div className="container">
						<div className="header">
							<Link
								className="brand"
								to="/"
							>
								SL News
								<span className="flavor-text">The news... that stags</span>
							</Link>
						</div>
					</div>
				</header>

				<Routes />
			</div>
		</ApolloProvider>
	</Router>
)

export default App
