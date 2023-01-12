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

export async function loadToys(filterBy) {
	try {
		const toys = await toyService.query(filterBy)
		store.dispatch({ type: SET_TOYS, toys })
		return toys
	} catch (err) {
		console.log('toy.action: Had issues loading toys', err)
		throw err
	} finally {
		console.log('toy.action: loadToys is done')
	}
}

export function loadToysOptimisticOld(filterBy) {
	return toyService
		.query(filterBy)
		.then((toys) => {
			store.dispatch({ type: SET_TOYS, toys })
		})
		.catch((err) => {
			console.log('Had issues loading toys', err)
			throw err
		})
}

export function loadToysNormal(filterBy, sortBy) {
	store.dispatch({ type: SET_IS_LOADING, isLoading: true })
	return toyService
		.query(filterBy, sortBy)
		.then((toys) => {
			store.dispatch({ type: SET_TOYS, toys })
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
export async function removeToyOptimistic(toyId) {
	store.dispatch({ type: REMOVE_TOY, toyId })
	try {
		return await toyService.remove(toyId)
	} catch (err) {
		store.dispatch({ type: UNDO_REMOVE_TOY })
		console.log('Had issues Removing toy', err)
		throw err
	}
}

export async function removeToyNormal(toyId) {
	try {
		await toyService.remove(toyId)
		store.dispatch({ type: REMOVE_TOY, toyId })
		return toyId
	} catch (err) {
		console.log('Had issues Removing toy', err)
		throw err
	}
}

export function removeToyNormalOld(toyId) {
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

export async function saveToy(toy) {
	const type = toy._id ? UPDATE_TOY : ADD_TOY
	try {
		const savedToy = await toyService.save(toy)
		store.dispatch({ type, toy: savedToy })
		return savedToy
	} catch (err) {
		console.log('Cannot save toy:', err)
		throw err
	}
}

export function saveToyOld(toy) {
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
	store.dispatch({ type: SET_FILTER, filterToys })
}

export function setSort(sortToys) {
	store.dispatch({ type: SET_SORT, sortToys })
}
