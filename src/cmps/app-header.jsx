import { NavLink } from 'react-router-dom'

export function AppHeader() {
	return (
		<header className="app-header full">
			<div className="header-container">
				<span className="logo">My Toy App</span>
				<nav>
					<NavLink to="/">Home</NavLink> |<NavLink to="/toy">Toys</NavLink> |
					<NavLink to="/dashboard">Dashboard</NavLink>
				</nav>
			</div>
		</header>
	)
}
