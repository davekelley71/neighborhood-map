import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import SquareAPI from './API/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 10
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
      console.log(nextVenue)
    });
  };
  componentDidMount() {
    SquareAPI.search({
      near: 'Lenox, MA',
      query: 'tavern',
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
        <Map {...this.state} 
        markerClick = {this.markerClick} />
      </div>
    );
  }
}

export default App;
