import { MsgPreview } from './msg-preview'

export function ToyMsgs({ toy, onRemoveMsg }) {
	// console.log('toy:', toy)
	console.log('toy.msgs:', toy.msgs)
	return (
		<ul className="msgs-list clean-list">
			{toy.msgs.map((msg) => (
				<li className="msg-preview" key={msg.id}>
					<button onClick={() => onRemoveMsg(msg.id)} className="btn clean-btn">
						X
					</button>
					<MsgPreview msg={msg} />
				</li>
			))}
		</ul>
	)
}
