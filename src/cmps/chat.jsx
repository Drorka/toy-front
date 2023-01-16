import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
	socketService,
	SOCKET_EMIT_SEND_MSG,
	SOCKET_EVENT_ADD_MSG,
	SOCKET_EMIT_SET_TOPIC,
} from '../services/socket.service'

export function ChatApp({ toy, onAddToyMsg }) {
	const [msg, setMsg] = useState({ txt: '' })
	const [msgs, setMsgs] = useState([])
	const [topic, setTopic] = useState('Love')
	const [isBotMode, setIsBotMode] = useState(false)
	const [isTyping, setIsTyping] = useState(false)

	const loggedInUser = useSelector((storeState) => storeState.userModule.user)

	let botTimeout

	useEffect(() => {
		socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
		return () => {
			socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
			botTimeout && clearTimeout(botTimeout)
		}
	}, [])

	useEffect(() => {
		setToyAsTopic()
		socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
	}, [topic])

	function setToyAsTopic() {
		setTopic(toy._id)
	}

	function addMsg(newMsg) {
		setIsTyping(false)
		setMsgs((prevMsgs) => [...prevMsgs, newMsg])
	}

	function sendBotResponse() {
		// Handle case: send single bot response (debounce).
		botTimeout && clearTimeout(botTimeout)
		botTimeout = setTimeout(() => {
			setMsgs((prevMsgs) => [
				...prevMsgs,
				{ from: 'Bot', txt: 'You are amazing!' },
			])
		}, 1250)
	}

	function sendMsg(ev) {
		ev.preventDefault()
		const from = loggedInUser?.fullname || 'Me'
		const newMsg = { from, txt: msg.txt }
		socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
		if (isBotMode) sendBotResponse()
		// for now - we add the msg ourself
		addMsg(newMsg)
		setMsg({ txt: '' })
		onAddToyMsg(newMsg)
	}

	function handleFormChange(ev) {
		sendTypingStatus()
		const { name, value } = ev.target
		setMsg((prevMsg) => ({ ...prevMsg, [name]: value }))
	}

	function sendTypingStatus() {
		socketService.emit('typing')
	}

	socketService.on('getTypingStatus', (tyipingIndication) => {
		handleShowingTypingStatusOnDOM(tyipingIndication)
	})

	function handleShowingTypingStatusOnDOM(tyipingIndication) {
		setIsTyping(true)
	}

	return (
		<section className="chat-app">
			<h2>Lets Chat about {topic}</h2>

			{/* <label>
				<input
					type="checkbox"
					name="isBotMode"
					checked={isBotMode}
					onChange={({ target }) => setIsBotMode(target.checked)}
				/>
				Bot Mode
			</label> */}

			{/* <div>
				<label>
					<input
						type="radio"
						name="topic"
						value="Love"
						checked={topic === 'Love'}
						onChange={({ target }) => setTopic(target.value)}
					/>
					Love
				</label>

				<label>
					<input
						type="radio"
						name="topic"
						value="Politics"
						checked={topic === 'Politics'}
						onChange={({ target }) => setTopic(target.value)}
					/>
					Politics
				</label>
			</div> */}

			<form onSubmit={sendMsg}>
				<input
					type="text"
					value={msg.txt}
					onChange={handleFormChange}
					name="txt"
					autoComplete="off"
				/>
				<button>Send</button>
			</form>

			<div>{isTyping ? <p>typing...</p> : ''}</div>

			<ul className="clean-list">
				{msgs.map((msg, idx) => (
					<li key={idx}>
						{msg.from}: {msg.txt}
					</li>
				))}
			</ul>
		</section>
	)
}
