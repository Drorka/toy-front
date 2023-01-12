import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
	loadToys,
	removeToyNormal,
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
	const navigate = useNavigate()

	useEffect(() => {
		loadToys(filterBy, sortBy)
	}, [filterBy, sortBy])

	function onSetFilter(filterToys) {
		setFilter(filterToys)
	}

	function onSetSort(sortToys) {
		setSort(sortToys)
	}

	async function onRemoveToy(toyId) {
		try {
			await removeToyNormal(toyId)
			// showSuccessMsg('Toy removed')
			console.log('removed successfully')
			navigate('/toy')
		} catch (err) {
			// showErrorMsg('Cannot remove toy')
			console.log('failed to remove')
			navigate('/toy')
		}
	}

	function onRemoveToyOld(toyId) {
		removeToyNormal(toyId)
			.then(() => {
				// showSuccessMsg('Toy removed')
				navigate('/toy')
			})
			.catch((err) => {
				// showErrorMsg('Cannot remove toy')
				navigate('/toy')
			})
		navigate('/toy')
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

	async function onEditToy(toy) {
		const title = prompt('New title?')
		const toyToSave = { ...toy, title }
		try {
			const savedToy = await saveToy(toyToSave)
			console.log('on edit success', savedToy)
			// showSuccessMsg(`Toy updated to price: $${savedToy.title}`)
		} catch (err) {
			console.log('on edit failed', err)
			// showErrorMsg('Cannot update toy')
		}
	}

	function onEditToyOld(toy) {
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
