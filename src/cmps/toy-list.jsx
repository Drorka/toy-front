import { Link } from 'react-router-dom'

import { ToyPreview } from './toy-preview.jsx'

export function ToyList({ toys, onRemoveToy, onAddToyMsg }) {
	return (
		<section className="toy-list">
			<ul className="clean-list grid list-grid">
				{toys.map((toy) => (
					<li
						className="preview-container flex column space-between"
						key={toy._id}
					>
						<div>
							<ToyPreview toy={toy} />
						</div>

						<p>
							Owner: <span>{toy.owner && toy.owner.fullname}</span>
						</p>

						<div>
							<button
								className="del-btn"
								onClick={() => {
									onRemoveToy(toy._id)
								}}
							>
								x
							</button>

							<button>
								<Link to={`/toy/${toy._id}`}>Details</Link>
							</button>

							<button>
								<Link to={`/toy/edit/${toy._id}`}>Edit</Link>
							</button>

							<button
								onClick={() => {
									onAddToyMsg(toy)
								}}
							>
								Add toy msg
							</button>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
