import React, {Component} from 'react';

export default class Item extends Component {
	render() {
		return (
			<li className = 'item' onClick = {() => this.props.itemClick(this.props)} >
				<img src = {this.props.categories[0].icon.prefix+'30'+this.props.categories[0].icon.suffix} 
				alt = {this.props.categories[0].name} />
				{this.props.name}
			</li>
		);
	}
}