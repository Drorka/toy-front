import { toyService } from '../services/toy.service'

export const SET_SORT = 'SET_SORT'

const initialState = {
	sortBy: toyService.getDefaultSort(),
}

export function sortReducer(state = initialState, action) {
	let sortBy
	switch (action.type) {
		// * sort
		case SET_SORT:
			return { ...state, sortBy: action.sortToys }

		default:
			return { ...state }
	}
}
