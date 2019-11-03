import React from 'react'
import {Switch, Route} from 'react-router-dom'
import NewsList from './pages/news-list'
import NewsItem from './pages/news-detail'

const Routes: React.FC = () => (
	<Switch>
		<Route exact path="/" component={NewsList} />
		<Route path="/news/:id" component={NewsItem} />
	</Switch>
)

export default Routes
