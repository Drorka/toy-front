import { Link } from 'react-router-dom'
import { ToyFilter } from './toy-filter'

export function SideBar({ onSetFilter, onSetSort }) {
	return (
		<aside className="side-bar">
			<div className="side-bar-container">
				<button className="add-btn">
					<Link to={`/toy/edit`}>Add Toy</Link>
				</button>
				<div className="side-bar-filter">
					<ToyFilter onSetFilter={onSetFilter} onSetSort={onSetSort} />
				</div>
			</div>
		</aside>
	)
}
