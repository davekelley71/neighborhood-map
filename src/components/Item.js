import React, {Component} from 'react';

export default class Item extends Component {
	render() {
		return (
			<li className = 'item'>
				{this.props.name}
			</li>
		);
	}
}