import { useState, useEffect } from 'react'
import { removeToy, saveToy } from '../store/toy.action'

export function ToyPreview({ toy }) {
	const [toyToEdit, setToyToEdit] = useState(toy)

	const toyStatus = toy.inStock ? 'available' : 'unavailable'

	function handleCheckboxChange({ target }) {
		console.log('before', toy.inStock)
		toy.inStock = !toy.inStock
		console.log('after', toy.inStock)
		// let { name: field } = target
		// setToyToEdit((prevToy) => ({ ...prevToy, [field]: toy.isDone }))
		saveToy(toyToEdit)
	}

	console.log(toy)

	let formattedLabels = toy.labels.toString()

	const imgUrl = 'Furby_picture.jpg'

	return (
		<article className="toy-preview">
			<h4 className="">{toy.name}</h4>
			<p className="toy-price">${toy.price}</p>
			<img
				className="toy-img"
				src={require(`../assets/img/${imgUrl}`)}
				alt=""
			/>
			<p className={toyStatus + ' toyStatus'}>{toyStatus}</p>
			<p className="toy-labels">{formattedLabels}</p>
		</article>
	)
}
