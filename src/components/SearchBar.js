import React, {Component} from 'react';
import VenueContent from './VenueContent';

export default class SearchBar extends Component {
	constructor() {
		super();
		this.state = {
			query: ''
		}
	}
	filterVenues = () => {

	};
	handleChange = event => {
		this.setState({query: event.target.value});
		const markers = this.props.venues.map( venue => {
			const matched = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
			const marker = this.props.markers.find(marker => marker.id === venue.id);
			if (matched) {
				marker.isVisible = true;
			}
			else {
				marker.isVisible = false;
			}
			return marker;
		});
		this.props.updateSuperState({ markers} );
	};
	render() {
		return (
			<div className= 'searchBar'>
				<input 
					type = {'search'} 
					id = {'search'} 
					placeholder = {'Search a Location'} 
					onChange = {this.handleChange} 
				/>
				<VenueContent {...this.props} 
					itemClick = { this.props.itemClick} 
				/>
			</div>
		);
	}
} 