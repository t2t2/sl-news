import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
	uri: 'https://news-reader.stagnationlab.dev/graphql'
})

export default client
