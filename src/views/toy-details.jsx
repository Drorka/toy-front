import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service'
import { toyService } from '../services/toy.service'
import { ToyMsgs } from '../cmps/toy-msg'
import { ChatApp } from '../cmps/chat'

export function ToyDetails() {
	const { toyId } = useParams()
	const [toy, setToy] = useState(null)
	const [msg, setMsg] = useState(toyService.getEmptyMsg())

	useEffect(() => {
		loadToy()
	}, [])

	async function loadToy() {
		try {
			const toy = await toyService.getById(toyId)
			setToy(toy)
		} catch (err) {
			console.log('failed', err)
		}
	}

	// useEffect(() => {
	// 	toyService
	// 		.getById(toyId)
	// 		.then((toy) => {
	// 			setToy(toy)
	// 		})
	// 		.catch((err) => {
	// 			// showErrorMsg('Cannot load toy')
	// 		})
	// }, [])

	// function handleChange({ target }) {
	// 	console.log(target)
	// 	let { value, name: field } = target
	// 	setMsg((prevMsg) => ({ ...prevMsg, [field]: value }))
	// }

	async function onAddToyMsg(msg) {
		try {
			console.log('msg de:', msg)

			const savedMsg = await toyService.addMsgToToy(toyId, msg)
			console.log('savedMsg de:', savedMsg)

			setToy((prevToy) => ({ ...prevToy, msgs: [...prevToy.msgs, savedMsg] }))
			setMsg(toyService.getEmptyMsg())
			showSuccessMsg('Msg saved!')
		} catch (err) {
			console.log('err', err)
			showErrorMsg('Cannot save Msg')
		}
	}

	async function onRemoveMsg(msgId) {
		try {
			await toyService.removeToyMsg(toyId, msgId)
			loadToy()
			showSuccessMsg('Msg Removed!')
		} catch (error) {
			showErrorMsg('Cannot remove Msg')
		}
	}

	const imgUrl = 'Furby_picture.jpg'

	if (!toy) return <h1>loadings....</h1>

	const toyStatus = toy.inStock ? 'available' : 'unavailable'
	let formattedLabels = toy.labels.toString()

	return (
		<section className="toy-details main-layout flex column">
			<h1>{toy.name}</h1>
			<div className="toy-details-content flex">
				<div className="toy-details-txt">
					<p>
						Price: <span>${toy.price}</span>
					</p>
					<p>
						Status:{' '}
						<span className={toyStatus + ' toyStatus'}>{toyStatus}</span>
					</p>
					<p>
						Created at: <span>{utilService.convertDate(toy)}</span>
					</p>
					<p>
						Labels: <span>{formattedLabels}</span>
					</p>
				</div>
				<div className="toy-details-img">
					<img src={require(`../assets/img/${imgUrl}`)} alt="" />
				</div>
			</div>

			<div className="chat-container">
				<ChatApp toy={toy} onAddToyMsg={onAddToyMsg} />
			</div>

			{/* <div className="add-msg-section">
				<form onSubmit={onAddToyMsg}>
					<label htmlFor="toyMsg">Add toy msg:</label>
					<input
						type="text"
						name="txt"
						id="toyMsg"
						value={msg.txt}
						onChange={handleChange}
					/>

					<button className="btn clean-btn">Add</button>
				</form>
			</div> */}

			{/* <div className="show-msg-section">
				{!toy.msgs ? (
					<h3>No msgs yet</h3>
				) : (
					<ToyMsgs toy={toy} onRemoveMsg={onRemoveMsg} />
				)}
			</div> */}

			<div className="toy-details-actions">
				<button>
					<Link to={`/toy/edit/${toy._id}`}>Edit Toy</Link>
				</button>
				<Link to="/toy"> Back to all toys</Link>
			</div>
		</section>
	)
}
