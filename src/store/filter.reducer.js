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
			return { ...state, filterBy: action.filterToys }

		default:
			return { ...state }
	}
}
