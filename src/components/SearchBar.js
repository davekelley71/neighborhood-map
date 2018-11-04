import React, {Component} from 'react';
import VenueContent from './VenueContent';

export default class SearchBar extends Component {
	render() {
		return (
			<div className= 'searchBar'>
				<input type = {'search'} id = {'search'} placeholder = {'Search a Location'} />
				<VenueContent {...this.props} />
			</div>
		);
	}
} 