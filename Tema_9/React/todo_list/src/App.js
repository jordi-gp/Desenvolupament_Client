import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [arrayTasca, setArray] = useState([]);

  const afigTasca = (e) => {
    arrayTasca: this.state.arrayTasca.concat('Tasca 1');
    console.log(arrayTasca)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Nova tasca</p>
        </div>
        <div>
          <input type="text"></input>
          <button type='submit' onClick={(e) => afigTasca(e)}>Afegir</button>
        </div>
        <div>
          <p>Tasques</p>
        </div>
        
      </header>
    </div>
  );
}

export default App;
