import { toyService } from '../services/toy.service'
import { store } from './store'
import {
	REMOVE_TOY,
	SET_TOYS,
	ADD_TOY,
	UPDATE_TOY,
	UNDO_REMOVE_TOY,
	SET_IS_LOADING,
} from './toy.reducer'

import { SET_FILTER } from './filter.reducer'
import { SET_SORT } from './sort.reducer'

export function loadToys(filterBy, sortBy) {
	store.dispatch({ type: SET_IS_LOADING, isLoading: true })
	console.log('action', filterBy, sortBy)
	return toyService
		.query(filterBy, sortBy)
		.then((toys) => {
			store.dispatch({ type: SET_TOYS, toys })
			console.log('action', filterBy, sortBy)
		})
		.catch((err) => {
			console.log('Had issues loading toys', err)
			throw err
		})
		.finally(() => {
			store.dispatch({ type: SET_IS_LOADING, isLoading: false })
		})
}

// Example for Optimistic mutation:
export function removeToy(toyId) {
	store.dispatch({ type: REMOVE_TOY, toyId })
	return toyService.remove(toyId).catch((err) => {
		store.dispatch({ type: UNDO_REMOVE_TOY })
		console.log('Had issues Removing toy', err)
		throw err
	})
}

export function removeToyNormal(toyId) {
	return toyService
		.remove(toyId)
		.then(() => {
			store.dispatch({ type: REMOVE_TOY, toyId })
		})
		.catch((err) => {
			console.log('Had issues Removing toy', err)
			throw err
		})
}

export function saveToy(toy) {
	const type = toy._id ? UPDATE_TOY : ADD_TOY
	return toyService
		.save(toy)
		.then((savedToy) => {
			store.dispatch({ type, toy: savedToy })
			return savedToy
		})
		.catch((err) => {
			console.error('Cannot save toy:', err)
			throw err
		})
}

export function setFilter(filterToys) {
	console.log('action filterToys', filterToys)
	store.dispatch({ type: SET_FILTER, filterToys })
}

export function setSort(sortToys) {
	console.log('action sortToys', sortToys)
	store.dispatch({ type: SET_SORT, sortToys })
}