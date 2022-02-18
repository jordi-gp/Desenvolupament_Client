import React, { useState } from 'react';
import './App.css';

function App() {
  const [arrayTasca, setArray] = useState([]);
  const [newTasca, setNewArray] = useState([]);




  const afigTasca = () => {
    // arrayTasca: this.state.arrayTasca.concat('Tasca 1');
    console.log(newTasca);
    //arrayTasca.push("a")
    //console.log(arrayTasca)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Nova tasca</p>
        </div>
        <div>
          <input type="text" value={newTasca} onChange={(e) => setNewArray(e.target.value)}></input>
          <button type='submit' onClick={() => afigTasca()}>Afegir</button>
        </div>
        <div>
          <p>Tasques</p>
        </div>
        
      </header>
    </div>
  );
}

export default App;
