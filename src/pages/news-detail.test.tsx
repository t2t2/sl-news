import {MockedProvider} from '@apollo/react-testing'
import {mount} from 'enzyme'
import React from 'react'
import {MemoryRouter, Route} from 'react-router-dom'

import NewsDetail, {GET_NEWS} from './news-detail'
import Loading from '../components/loading'
import {updateWrapper} from '../utils/tests'
import ErrorComponent from '../components/error'

describe('pages/NewsDetail', () => {
	it('Found news', async () => {
		const mocks = [
			{
				request: {
					query: GET_NEWS,
					variables: {
						id: '1'
					}
				},
				result: {
					data: {
						newsItem: {
							id: '1',
							title: 'Test Item',
							content: 'Test Test Test',
							url: 'http://site.example.com/image.png',
							img: 'http://example.com/image.png'
						}
					}
				}
			}
		]

		const wrapper = mount(
			<MemoryRouter initialEntries={['news/1']}>
				<Route path="news/:id">
					<MockedProvider mocks={mocks} addTypename={false}>
						<NewsDetail />
					</MockedProvider>
				</Route>
			</MemoryRouter>
		)

		expect(wrapper.find(Loading)).toHaveLength(1)

		await updateWrapper(wrapper)

		expect(wrapper.find(Loading)).toHaveLength(0)
		expect(wrapper.find(ErrorComponent)).toHaveLength(0)

		// Has link to read more
		const readMore = wrapper.find('.news-read-more')
		expect(readMore).toHaveLength(1)
		expect(readMore.text()).toBe('Read more at site.example.com »')
	})
})
