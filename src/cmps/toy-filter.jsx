import { useState, useEffect, useRef } from 'react'

import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'

export function ToyFilter({ onSetFilter, onSetSort }) {
	const [filterToys, setFilterToys] = useState(toyService.getDefaultFilter())
	const [sortToys, setSortToys] = useState(toyService.getDefaultSort())

	onSetFilter = useRef(utilService.debounce(onSetFilter))

	useEffect(() => {
		// update father cmp that filters change very type
		onSetFilter.current(filterToys)
	}, [filterToys])

	useEffect(() => {
		// update father cmp that filters change very type
		onSetSort(sortToys)
	}, [sortToys])

	function handleChange({ target }) {
		console.log('filter handle filter', target.value)
		let { value, name: field, type } = target
		value = type === 'number' ? +value : value
		setFilterToys((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

	function handleSortChange({ target }) {
		console.log('filter handle sort', target.value)
		let { value, name: field, type } = target
		value = type === 'number' ? +value : value
		setSortToys((prevSort) => ({ ...prevSort, [field]: value }))
	}

	function onClearFilters() {
		setFilterToys((prevFilter) => toyService.getDefaultFilter())
		setSortToys((prevSort) => toyService.getDefaultSort())
	}

	// function onSubmitFilter(ev) {
	// 	// update father cmp that filters change on submit
	// 	ev.preventDefault()
	// 	console.log('submit filter', filterToys)
	// 	onSetFilter(filterToys)
	// }

	return (
		<section className="toy-filter main-layout">
			<div className="filter-container">
				<form>
					<h4>Search</h4>
					<div className="filtering">
						<div className="">
							<label htmlFor="name"></label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Search toys"
								value={filterToys.name}
								onChange={handleChange}
							/>
						</div>
						<div className="">
							<label htmlFor="inStock"></label>
							<select
								name="inStock"
								id="inStock"
								type="text"
								onChange={handleChange}
							>
								<option value="all">All toys</option>
								<option value="available">Available toys</option>
								<option value="unavailable">Unavailable toys</option>
							</select>
						</div>
					</div>

					<h4>Sort</h4>
					<div className="sorting">
						<div>
							<label htmlFor="sort"></label>
							<select
								name="sortByCat"
								value={sortToys.sortByCat}
								onChange={handleSortChange}
							>
								<option value="">Sort By</option>
								<option value="name">Name</option>
								<option value="createdAt">Date created</option>
								<option value="price">Price</option>
							</select>
						</div>

						<div>
							<select name="desc" id="desc" onChange={handleSortChange}>
								<option value="">Sort order</option>
								<option type="number" value="1">
									Ascending
								</option>
								<option type="number" value="-1">
									Descending
								</option>
							</select>
							{/* <input
								name="desc"
								id="desc"
								type="checkbox"
								value={sortToys.desc}
								onChange={handleSortChange}
							/> */}
							{/* <label htmlFor="order">Sort order</label>
							<select
								name="order"
								id="is-read-filter"
								type="text"
								onChange={handleSortChange}
							>
								<option value={-1}>Decending</option>
								<option value={1}>Acending</option>
							</select> */}
						</div>
					</div>
					{/* <button className="filter-btn">Apply filters</button> */}
					<button
						onClick={onClearFilters}
						className="clear-filter-btn filter-btn"
					>
						Clear all filters
					</button>
				</form>
			</div>
		</section>
	)
}
