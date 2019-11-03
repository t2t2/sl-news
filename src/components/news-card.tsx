import React from 'react'
import {Link} from 'react-router-dom'

export interface NewsItemSchema {
	id: string;
	title: string;
	img: string;
}

const NewsCard: React.FC<{
	featured?: boolean;
	item: NewsItemSchema;
}> = ({featured, item}) => {
	let className = 'news-card'
	if (featured) {
		className += ' is-featured'
	}

	return (
		<Link
			className={className}
			to={`/news/${item.id}`}
		>
			<div
				className="card-image"
				style={{
					backgroundImage: `url('${item.img}')`
				}}
			>

			</div>
			<div className="card-content">
				<h4 className="card-title">{item.title}</h4>
			</div>
		</Link>
	)
}

export default NewsCard
