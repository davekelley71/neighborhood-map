import React, {Component} from 'react';
import Item from './Item';

export default class VenueContent extends Component {
	render() {
		return (
			<ol className = 'venueContent'>
				{ this.props.venues && 
					this.props.venues.map((venue, idx) =>  
						<Item key = {idx} {...venue} /> 
				)}
			</ol>
		);
	}
}