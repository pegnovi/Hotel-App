import React, { Component } from 'react';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

const selectedStyle = {
  fontWeight: 'bold',
  color: 'red'
};

const tVar = {
  item: 'Bobby'
};

export default class CustomNavigationBar extends Component {
	render() {
		return <div>
			<Navbar>
				<Nav>

					<NavItem eventKey={1}>
						<NavLink exact to="/rooms" activeStyle={selectedStyle}>Rooms</NavLink>
					</NavItem>

					<NavItem eventKey={2}>
						<NavLink exact to="/about2" activeStyle={selectedStyle}>About2</NavLink>
					</NavItem>

					<NavItem eventKey={3}>
						<NavLink to={`/test/${tVar.item}`}>Test</NavLink>
					</NavItem>

					<NavItem eventKey={9}>
						<NavLink exact to={"/shop/"} activeStyle={selectedStyle}>Shop</NavLink>
					</NavItem>

					<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Action</MenuItem>
						<MenuItem eventKey={3.2}>Another action</MenuItem>
						<MenuItem eventKey={3.3}>Something else here</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.4}>Separated link</MenuItem>
					</NavDropdown>

					<NavItem eventKey={4}>
						<NavLink exact to="/cart" activeStyle={selectedStyle}>Cart</NavLink>
					</NavItem>

					<NavItem eventKey={5}>
						<NavLink exact to="/orders" activeStyle={selectedStyle}>Orders</NavLink>
					</NavItem>

					<NavItem eventKey={6}>
						<NavLink exact to="/contact" activeStyle={selectedStyle}>Contact</NavLink>
					</NavItem>

				</Nav>
			</Navbar>
		</div>
	}
}
