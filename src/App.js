import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import SquareAPI from './API/'

class App extends Component {
  componentDidMount() {
    SquareAPI.search({
      near: 'Austin, TX',
      query: 'tacos',
      limit: 10}).then(res => console.log(res));

  }
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
