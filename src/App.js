import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import SquareAPI from './API/';
import SearchBar from './components/SearchBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 10,
      updateSuperState: object => {
        this.setState(object);
      }
    };
  }
  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen=false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)})
  };
  markerClick = (marker) => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    SquareAPI.getVenueDetails(marker.id).then(result => {
      const nextVenue = Object.assign(venue, result.response.venue);
      this.setState({venues: Object.assign(this.state.venues, nextVenue)});
      console.log(nextVenue);
    });
  };
  itemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.markerClick(marker);
    console.log(marker);
  };
  componentDidMount() {
    SquareAPI.search({
      near: 'Lafayette, CO',
      query: 'tacos',
      limit: 10
      })
      .then(res => {
        const{venues}=res.response;
        const{center}=res.response.geocode.feature.geometry;
        const markers=venues.map(ven => {
          return {
            lat:ven.location.lat,
            lng:ven.location.lng,
            isOpen:false,
            isVisible:true,
            id:ven.id
          };
        });
        this.setState({venues, center, markers});
        console.log(res)
      });
  }
  render() {
    return (
      <div className="App">
        <SearchBar {...this.state} itemClick = {this.itemClick} />
        <Map {...this.state} 
        markerClick = {this.markerClick} />
      </div>
    );
  }
}

export default App;
