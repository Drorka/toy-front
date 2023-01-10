import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

// import { showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service'
import { toyService } from '../services/toy.service'

export function ToyDetails() {
	const { toyId } = useParams()
	const [toy, setToy] = useState(null)

	useEffect(() => {
		toyService
			.getById(toyId)
			.then((toy) => {
				setToy(toy)
			})
			.catch((err) => {
				// showErrorMsg('Cannot load toy')
			})
	}, [])

	const imgUrl = 'Furby_picture.jpg'

	if (!toy) return <h1>loadings....</h1>

	return (
		<section className="toy-details main-layout">
			<h1>{toy.name}</h1>
			{/* <h2>{toy.description}</h2> */}
			<p>
				Price: <span>${toy.price}</span>
			</p>
			<p>
				Status: <span>{toy.inStock ? 'Available' : 'Unavailable'}</span>
			</p>
			<div className="toy-details-img">
				<img src={require(`../assets/img/${imgUrl}`)} alt="" />
			</div>
			<p>
				Created at: <span>{utilService.convertDate(toy)}</span>
			</p>
			<div>
				<Link to={`/toy/edit/${toy._id}`}>Edit Toy</Link> |
				<Link to="/toy"> Back to all toys</Link>
			</div>
		</section>
	)
}
