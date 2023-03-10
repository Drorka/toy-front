import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

// import { showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service'
import { removeToyNormal, saveToy } from '../store/toy.action'

export function ToyEdit() {
	const { toyId } = useParams()
	const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
	const navigate = useNavigate()

	useEffect(() => {
		loadToy()
	}, [])

	async function loadToy() {
		if (!toyId) return
		try {
			const toyToEdit = await toyService.getById(toyId)
			setToyToEdit(toyToEdit)
		} catch (err) {
			console.log('failed', err)
		}
	}

	// useEffect(() => {
	// 	if (!toyId) return
	// 	toyService
	// 		.getById(toyId)
	// 		.then((toyToEdit) => {
	// 			setToyToEdit(toyToEdit)
	// 		})
	// 		.catch((err) => {
	// 			// showErrorMsg('Cannot load toy')
	// 		})
	// }, [])

	function handleChange({ target }) {
		let { value, type, name: field } = target
		value = type === 'number' ? +value : value
		setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
	}

	function handleBooleanChange({ target }) {
		let { value, type, name: field } = target
		let newVal
		if (value === 'false') newVal = false
		if (value === 'true') newVal = true
		setToyToEdit((prevToy) => ({ ...prevToy, [field]: newVal }))
	}

	function onSubmit(ev) {
		ev.preventDefault()
		saveToy(toyToEdit)
		console.log('success!')
	}

	async function onRemoveToy() {
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

	function onRemoveToyOld() {
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

	const imgUrl = 'Furby_picture.jpg'

	// if (!toyToEdit) return <h1>loadings....</h1>

	return (
		<section className="toy-edit main-layout">
			<h1>Edit {toyToEdit.name}</h1>
			<div className="toy-edit-content flex">
				<form onSubmit={onSubmit}>
					<table>
						<tbody>
							<tr>
								<td>Name</td>
								<td>
									<input
										type="text"
										name="name"
										id="name"
										placeholder="Enter name..."
										defaultValue={toyToEdit.name}
										onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<td>Price</td>
								<td>
									<input
										type="text"
										name="price"
										id="price"
										placeholder="Enter price..."
										defaultValue={toyToEdit.price}
										onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<td>Status</td>
								<td>
									<select
										name="inStock"
										id="inStock"
										type="boolean"
										onChange={handleBooleanChange}
									>
										<option selected disabled hidden>
											{`${toyToEdit.inStock ? 'Available' : 'Unavailable'}`}
										</option>
										<option value="false">Unavailable</option>
										<option value="true">Available</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>

					<button>Submit</button>
				</form>

				<div className="toy-edit-img">
					<img src={require(`../assets/img/${imgUrl}`)} alt="" />
				</div>
			</div>

			<div className="toy-edit-actions">
				<button className="del-btn" onClick={onRemoveToy}>
					Delete Toy
				</button>

				<Link to="/toy">Back to all toys</Link>
			</div>
		</section>
	)
}
