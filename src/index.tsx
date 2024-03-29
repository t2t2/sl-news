import React from 'react'
import ReactDOM from 'react-dom'
import './assets/style/main.scss'
import App from './app'
import * as serviceWorker from './service-worker'

ReactDOM.render(<App />, document.querySelector('#root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
