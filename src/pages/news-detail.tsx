import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import React from 'react'
import {useParams} from 'react-router'

import {errorPageLayout} from './_common'
import Loading from '../components/loading'
import ErrorComponent from '../components/error'

const GET_NEWS = gql`
	query GET_NEWS($id: ID!) {
		newsItem(id: $id) {
			id,
			title,
			content,
			url,
			img
		}
	}
`

export interface NewsItem {
	id: string;
	title: string;
	content: string;
	url: string;
	img: string;
}
interface NewsItemData {
	newsItem?: NewsItem;
}
interface NewsListVars {
	id: string;
}

const NewsDetail: React.FC = () => {
	const {id} = useParams<{id: string}>()

	const {loading, error, data} = useQuery<NewsItemData, NewsListVars>(GET_NEWS, {
		variables: {
			id
		}
	})

	if (loading) {
		return <Loading />
	}

	if (error) {
		return errorPageLayout(
			<ErrorComponent
				error={error}
				isHome={true}
			/>
		)
	}

	if (!data || !data.newsItem) {
		return errorPageLayout(
			<ErrorComponent
				message="News not found"
				isHome={true}
			/>
		)
	}

	const {newsItem: item} = data
	// Ignore http(s)://[example.com]/asdfqwer - [this part]
	let postDomainSlash = item.url.indexOf('/', 8)
	if (postDomainSlash === -1) {
		postDomainSlash = item.url.length
	}

	let preDomainSlash = item.url.lastIndexOf('/', postDomainSlash - 1)
	if (preDomainSlash === -1) {
		preDomainSlash = 0
	}

	const domain = item.url.slice(preDomainSlash + 1, postDomainSlash)

	return (
		<div className="news-detail">
			<div className="news-image-container">
				<div
					className="news-image"
					style={{
						backgroundImage: `url('${item.img}')`
					}}
				/>
			</div>
			<div className="container">
				<div className="news-content">
					<h1 className="news-title">
						<a className="news-title-link" href={item.url}>{item.title}</a>
					</h1>
					<p>{item.content}</p>
					<a className="button news-read-more" href={item.url}>
						Read more at {domain} &raquo;
					</a>
				</div>
			</div>
		</div>
	)
}

export default NewsDetail
