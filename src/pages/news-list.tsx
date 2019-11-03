import React from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

import NewsCard, {NewsItemSchema as NewsItem} from '../components/news-card'
import Loading from '../components/loading'

const GET_NEWS = gql`
	query GetNewsList($skip: Int!) {
		newsList(skip: $skip, limit: 10) {
			totalRows,
			rows {
				id,
				title,
				img
			}
		}
	}
`

interface NewsListData {
	newsList: {
		totalRows: number;
		rows: NewsItem[];
	};
}
interface NewsListVars {
	skip: number;
}

const NewsList: React.FC = () => {
	let {loading, error, data, fetchMore} = useQuery<NewsListData, NewsListVars>(GET_NEWS, {
		variables: {
			skip: 0
		}
	})

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <p>Error <span role="img" aria-label="sad">😢</span></p>
	}

	if (!data || data.newsList.rows.length === 0) {
		return (
			<div>
				No Data
			</div>
		)
	}

	const {rows, totalRows} = data.newsList

	const loadMore = (): void => {
		fetchMore({
			variables: {
				skip: rows.length
			},
			updateQuery: (previous, {fetchMoreResult}) => {
				if (!fetchMoreResult) {
					return previous
				}

				return {
					...previous,
					newsList: {
						...previous.newsList,
						rows: [
							...previous.newsList.rows,
							...fetchMoreResult.newsList.rows
						]
					}
				}
			}
		})
	}

	return (
		<div className="section">
			<div className="news-list">
				{rows.map((newsItem: NewsItem, i) => (
					<NewsCard
						key={newsItem.id}
						featured={i < 2}
						item={newsItem}
					/>
				))}
			</div>
			{
				rows.length < totalRows ?
					<button
						className="button is-fullwidth"
						onClick={loadMore}
					>
						Load More
					</button> :
					null
			}
		</div>
	)
}

export default NewsList
