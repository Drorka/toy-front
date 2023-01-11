import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from './store/store'
import { Home } from './views/home'
import { ToyIndex } from './views/toy-index'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { ToyDetails } from './views/toy-details'
import { ToyEdit } from './views/toy-edit'
import { ToyDashboard } from './views/toy-dashboard'

// import './assets/css/main.css'
import './assets/scss/styles.scss'

export function App() {
	return (
		<Provider store={store}>
			<Router>
				<section className="main-layout app">
					<AppHeader />
					<main className="main-app-container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/toy" element={<ToyIndex />} />
							<Route path="/toy/:toyId" element={<ToyDetails />} />
							<Route path="/toy/edit/:toyId" element={<ToyEdit />} />
							<Route path="/toy/edit/" element={<ToyEdit />} />
							<Route path="/dashboard" element={<ToyDashboard />} />
						</Routes>
					</main>
					{/* <AppFooter /> */}
				</section>
			</Router>
		</Provider>
	)
}
