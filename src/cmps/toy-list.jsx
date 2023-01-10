import { Link } from 'react-router-dom'

import { ToyPreview } from './toy-preview.jsx'

export function ToyList({ toys, onRemoveToy, onEditToy }) {
	return (
		<section className="toy-list">
			<ul className="clean-list grid list-grid">
				{toys.map((toy) => (
					<li className="preview-container" key={toy._id}>
						<ToyPreview toy={toy} />

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
