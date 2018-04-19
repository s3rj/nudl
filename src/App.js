import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Tile from './components/Tile'

import tiles2 from './tiles2.json';

class App extends Component {



  render() {
    return (
        <div className="App">
            <header className="App-header">
               <br/>
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                <h1 className="App-title">NūDL</h1>
            </header>
            <p className="App-intro">
                align the pieces.
            </p>
            <section className="tile-container">
                {tiles2.map(tile=> (
                    <Tile
                        tileClicked={this.tileClicked}
                        image={tile.image}
                        key={tile.id}
                        id = {tile.id}
                        solution={3}
                    />
                ))}
            </section>


        </div>
    );
  }
}

export default App;

// {this.state.matches.map(match => (
//     <MatchCard
//         setClicked={this.setClicked}
//         id={match.id}
//         key={match.id}
//         image={match.image}
//     />
// ))}