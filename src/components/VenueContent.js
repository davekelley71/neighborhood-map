import React, {Component} from 'react';
import Item from './Item';

export default class VenueContent extends Component {
	render() {
		return (
			<ol className = 'venueContent'>
				<Item />
			</ol>
		);
	}
}