import React, {Component} from 'react';
import VenueContent from './VenueContent';

export default class SearchBar extends Component {
	constructor() {
		super();
		this.state = {
			query: '',
			venues: []
		};
	}

	// Filter out places that do not match search criteria

	filterVenues = () => {
		if ( this.state.query.trim() !== '' ) {
			const venues = this.props.venues.filter(venue => venue.name
				.toLowerCase()
				.includes(this.state.query.toLowerCase())
			)
			return venues;
		}
		return this.props.venues;
	};

	// Filter out markers that do not meet criteria
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
					venues = { this.filterVenues() }
					itemClick = { this.props.itemClick} 
				/>
			</div>
		);
	}
} 