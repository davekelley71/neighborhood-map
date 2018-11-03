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
  componentDidMount() {
    SquareAPI.search({
      near: '80026',
      query: 'food',
      limit: 20
      })
      .then(res => {
        const{venues}=res.response;
        const{center}=res.response.geocode.feature.geometry;
        const markers=venues.map(ven => {
          return {
            lat:ven.location.lat,
            lng:ven.location.lng,
            isOpen:false,
            isVisible:true
          };
        });
        this.setState({venues, center, markers});
        console.log(res)
      });
  }
  render() {
    return (
      <div className="App">
        <Map {...this.state} />
      </div>
    );
  }
}

export default App;
