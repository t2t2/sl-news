import {MockedProvider} from '@apollo/react-testing'
import {mount} from 'enzyme'
import React from 'react'
import {MemoryRouter, Route} from 'react-router-dom'

import NewsList, {LIST_NEWS} from './news-list'
import NewsCard, {NewsItemSchema} from '../components/news-card'
import Loading from '../components/loading'
import {updateWrapper} from '../utils/tests'

function getMockItem(id: string): NewsItemSchema {
	return {
		id,
		title: `Item ${id}`,
		img: 'http://example.com/image.png'
	}
}

describe('pages/NewsList', () => {
	it('Normal use', async () => {
		const mocks = [
			{
				request: {
					query: LIST_NEWS,
					variables: {
						skip: 0
					}
				},
				result: {
					data: {
						newsList: {
							totalRows: 2,
							rows: [
								getMockItem('1'),
								getMockItem('2')
							]
						}
					}
				}
			}
		]

		const wrapper = mount(
			<MemoryRouter initialEntries={['/']}>
				<Route path="/">
					<MockedProvider mocks={mocks} addTypename={false}>
						<NewsList />
					</MockedProvider>
				</Route>
			</MemoryRouter>
		)

		expect(wrapper.find(Loading)).toHaveLength(1)

		await updateWrapper(wrapper)

		expect(wrapper.find(Loading)).toHaveLength(0)
		expect(wrapper.find(NewsCard)).toHaveLength(2)
		expect(wrapper.find('button')).toHaveLength(0)
	})

	it('Has button to load more', async () => {
		const mocks = [
			{
				request: {
					query: LIST_NEWS,
					variables: {
						skip: 0
					}
				},
				result: {
					data: {
						newsList: {
							totalRows: 20,
							rows: [
								getMockItem('1'),
								getMockItem('2'),
								getMockItem('3'),
								getMockItem('4'),
								getMockItem('5'),
								getMockItem('6'),
								getMockItem('7'),
								getMockItem('8'),
								getMockItem('9'),
								getMockItem('10')
							]
						}
					}
				}
			}
		]

		const wrapper = mount(
			<MemoryRouter initialEntries={['/']}>
				<Route path="/">
					<MockedProvider mocks={mocks} addTypename={false}>
						<NewsList />
					</MockedProvider>
				</Route>
			</MemoryRouter>
		)

		await updateWrapper(wrapper)

		expect(wrapper.find(Loading)).toHaveLength(0)
		expect(wrapper.find(NewsCard)).toHaveLength(10)
		expect(wrapper.find('button')).toHaveLength(1)
	})
})
