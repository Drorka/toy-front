import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
	loadToys,
	removeToy,
	saveToy,
	setFilter,
	setSort,
} from '../store/toy.action'

import { toyService } from '../services/toy.service'
import { ToyList } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'
import { SideBar } from '../cmps/side-bar'

export function ToyIndex() {
	const toys = useSelector((storeState) => storeState.toyModule.toys)
	const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
	const sortBy = useSelector((storeState) => storeState.sortModule.sortBy)
	// const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

	useEffect(() => {
		loadToys(filterBy, sortBy)
	}, [filterBy, sortBy])

	function onSetFilter(filterToys) {
		setFilter(filterToys)
	}

	function onSetSort(sortToys) {
		setSort(sortToys)
	}

	function onRemoveToy(toyId) {
		removeToy(toyId)
			.then(() => {
				// showSuccessMsg('Toy removed')
			})
			.catch((err) => {
				// showErrorMsg('Cannot remove toy')
			})
	}

	// function onAddToy() {
	// 	const toyToSave = toyService.getEmptyToy()
	// 	toyToSave.title = prompt('Enter toy:')
	// 	saveToy(toyToSave)
	// 		.then((savedToy) => {
	// 			// showSuccessMsg(`Toy added (id: ${savedToy._id})`)
	// 		})
	// 		.catch((err) => {
	// 			// showErrorMsg('Cannot add toy')
	// 		})
	// }

	function onEditToy(toy) {
		const title = prompt('New title?')
		const toyToSave = { ...toy, title }
		saveToy(toyToSave)
			.then((savedToy) => {
				// showSuccessMsg(`Toy updated to price: $${savedToy.title}`)
			})
			.catch((err) => {
				// showErrorMsg('Cannot update toy')
			})
	}

	return (
		<section className="toy-index main-layout">
			{/* <ToyFilter onSetFilter={onSetFilter} onSetSort={onSetSort} /> */}
			<main className="main-content-container flex">
				<SideBar onSetFilter={onSetFilter} onSetSort={onSetSort} />
				<ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
			</main>
		</section>
	)
}
