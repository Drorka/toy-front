import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './toy.reducer'
import { filterReducer } from './filter.reducer'
import { sortReducer } from './sort.reducer'
import { userReducer } from './user.reducer.js'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
	toyModule: toyReducer,
	filterModule: filterReducer,
	sortModule: sortReducer,
	userModule: userReducer,
})

export const store = createStore(rootReducer, middleware)

// For debug
store.subscribe(() => {
	// console.log('**** Store state changed: ****')
	// console.log('storeState:\n', store.getState())
	// console.log('*******************************')
})
