import { asyncStorageService } from './async-storage.service'
import { utilService } from './util.service'
import { httpService } from './http.service'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

// createToys()

export const toyService = {
	query,
	getById,
	save,
	remove,
	getEmptyToy,
	getDefaultFilter,
	getDefaultSort,
	getToyLabels,
}

// *
// * LOCAL CRUDL
// *

// function query(filterBy, sortBy) {
// 	console.log('service sortBy', sortBy)
// 	console.log('service filterBy', filterBy)
// 	// return axios.get(BASE_URL).then(res => res.data)
// 	return asyncStorageService.query(STORAGE_KEY).then((toys) => {
// 		let filteredToys = toys
// 		// filtering
// 		if (filterBy.name) {
// 			console.log('service', filterBy.name)
// 			const regex = new RegExp(filterBy.name, 'i')
// 			filteredToys = filteredToys.filter((toy) => regex.test(toy.name))
// 		}

// 		if (filterBy.inStock === 'all') {
// 			filteredToys = toys
// 		}
// 		if (filterBy.inStock === 'available') {
// 			filteredToys = filteredToys.filter((toy) => toy.inStock)
// 		}
// 		if (filterBy.inStock === 'unavailable') {
// 			filteredToys = filteredToys.filter((toy) => !toy.inStock)
// 		}

// 		// Sorting
// 		if (sortBy) {
// 			console.log('service', sortBy)
// 			if (sortBy.sortByCat === 'createdAt' || sortBy.sortByCat === 'price') {
// 				filteredToys.sort(
// 					(b1, b2) =>
// 						(b1[sortBy.sortByCat] - b2[sortBy.sortByCat]) * sortBy.desc
// 				)
// 			}
// 			if (sortBy.sortByCat === 'name') {
// 				filteredToys.sort(
// 					(b1, b2) => b1.name.localeCompare(b2.name) * sortBy.desc
// 				)
// 			}
// 		}
// 		console.log('service returns', filteredToys)
// 		return filteredToys
// 	})
// }

// function getById(toyId) {
// 	return asyncStorageService.get(STORAGE_KEY, toyId)
// }

// function remove(toyId) {
// 	console.log('toy service', toyId)

// 	// return Promise.reject('Not now!')
// 	return asyncStorageService.remove(STORAGE_KEY, toyId)
// }

// function save(toy) {
// 	if (toy._id) {
// 		return asyncStorageService.put(STORAGE_KEY, toy)
// 	} else {
// 		// when switching to backend - remove the next line
// 		// toy.owner = userService.getLoggedinUser()
// 		return asyncStorageService.post(STORAGE_KEY, toy)
// 	}
// }

// *
// * HTTPS CRUDL
// *

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
	const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}&labels=${filterBy.labels}`
	console.log('service queryParams', queryParams)
	return httpService.get(BASE_URL + queryParams).then((toys) => {
		let filteredToys = toys
		// Sorting
		if (sortBy) {
			console.log('service', sortBy)
			if (sortBy.sortByCat === 'createdAt' || sortBy.sortByCat === 'price') {
				filteredToys.sort(
					(b1, b2) =>
						(b1[sortBy.sortByCat] - b2[sortBy.sortByCat]) * sortBy.desc
				)
			}
			if (sortBy.sortByCat === 'name') {
				filteredToys.sort(
					(b1, b2) => b1.name.localeCompare(b2.name) * sortBy.desc
				)
			}
		}
		return filteredToys
	})
}

// function query(filterBy = getDefaultFilter()) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (filterBy.txt) {
//                 const regex = new RegExp(filterBy.txt, 'i')
//                 toys = toys.filter(toy => regex.test(toy.vendor))
//             }
//             if (filterBy.maxPrice) {
//                 toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
//             }
//             return toys
//         })
// }

function getById(toyId) {
	// return asyncStorageService.get(STORAGE_KEY, toyId)
	return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
	// return Promise.reject('Not now!')
	console.log('remove', toyId)
	return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
	if (toy._id) {
		return httpService.put(BASE_URL, toy)
	} else {
		// when switching to backend - remove the next line
		// toy.owner = userService.getLoggedinUser()
		return httpService.post(BASE_URL, toy)
	}
}

// *
// * FILTERING AND DATA BASE
// *

function getDefaultFilter() {
	return { name: '', labels: [], inStock: 'all' }
}

function getDefaultSort() {
	return { sortByCat: '', desc: 1 }
}

function getToyLabels() {
	const labels = [
		'On wheels',
		'Box game',
		'Art',
		'Baby',
		'Doll',
		'Puzzle',
		'Outdoor',
		'Battery Powered',
		'Cards',
	]
	return labels
}

// function createToys() {
// 	let toys = _loadFromStorage(STORAGE_KEY) || [
// 		{
// 			_id: 't101',
// 			name: 'Talking Doll',
// 			price: 123,
// 			labels: ['Doll', 'Battery Powered', 'Baby'],
// 			createdAt: 1631031801011,
// 			inStock: true,
// 			img: 'Furby_picture.jpg',
// 		},
// 		{
// 			_id: 't102',
// 			name: 'Race Car',
// 			price: 80,
// 			labels: ['Car', 'Battery Powered', 'On wheels'],
// 			createdAt: 1631031801011,
// 			inStock: true,
// 			img: 'Furby_picture.jpg',
// 		},
// 		{
// 			_id: 't103',
// 			name: 'Puzzle',
// 			price: 150,
// 			labels: ['Puzzle', 'Box game'],
// 			createdAt: 1631031801011,
// 			inStock: true,
// 			img: 'Furby_picture.jpg',
// 		},
// 		{
// 			_id: 't104',
// 			name: 'Football',
// 			price: 100,
// 			labels: ['Outdoor'],
// 			createdAt: 1631031801011,
// 			inStock: false,
// 			img: 'Furby_picture.jpg',
// 		},
// 		{
// 			_id: 't105',
// 			name: 'Playing Cards',
// 			price: 65,
// 			labels: ['Cards'],
// 			createdAt: 1631031801011,
// 			inStock: false,
// 			img: 'Furby_picture.jpg',
// 		},
// 	]

// 	_saveToStorage(STORAGE_KEY, toys)
// 	return toys
// }

function getEmptyToy() {
	return {
		name: 'New Toy',
		price: 10,
		labels: [],
		inStock: true,
	}
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))

// *
// * LOCAL STORAGE MNGMNT
// *

function _saveToStorage(key, val) {
	localStorage.setItem(key, JSON.stringify(val))
}

function _loadFromStorage(key) {
	var val = localStorage.getItem(key)
	return JSON.parse(val)
}
