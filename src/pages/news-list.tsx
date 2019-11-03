import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import React from 'react'

import NewsCard, {NewsItemSchema as NewsItem} from '../components/news-card'
import Loading from '../components/loading'
import ErrorComponent from '../components/error'
import {errorPageLayout} from './_common'

export const LIST_NEWS = gql`
	query LIST_NEWS($skip: Int!) {
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
	const {loading, error, data, fetchMore} = useQuery<NewsListData, NewsListVars>(LIST_NEWS, {
		variables: {
			skip: 0
		}
	})

	if (loading) {
		return <Loading />
	}

	if (error) {
		return errorPageLayout(
			<ErrorComponent
				error={error}
			/>
		)
	}

	if (!data || data.newsList.rows.length === 0) {
		return errorPageLayout(
			<ErrorComponent
				message="No Data"
			/>
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
		<div className="container">
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
		</div>
	)
}

export default NewsList
