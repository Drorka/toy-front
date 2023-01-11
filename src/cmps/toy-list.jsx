import { Link } from 'react-router-dom'

import { ToyPreview } from './toy-preview.jsx'

export function ToyList({ toys, onRemoveToy, onEditToy }) {
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
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
