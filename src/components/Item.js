import React, {Component} from 'react';

export default class Item extends Component {
	render() {
		return (
			<li className = 'item' onClick = {() => this.props.itemClick(this.props)} >
				{this.props.name}
			</li>
		);
	}
}