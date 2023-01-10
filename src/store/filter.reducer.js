import { toyService } from '../services/toy.service'

export const SET_FILTER = 'SET_FILTER'

const initialState = {
	filterBy: toyService.getDefaultFilter(),
}

export function filterReducer(state = initialState, action) {
	let filterBy
	switch (action.type) {
		// * filter
		case SET_FILTER:
			console.log('store', action)
			console.log('store', action.filterToys)
			return { ...state, filterBy: action.filterToys }

		default:
			return { ...state }
	}
}
