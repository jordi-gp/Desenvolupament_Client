import { array } from 'prop-types';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [arrayTasca, setArray] = useState([]);
  const [newTasca, setNewArray] = useState([]);

  const afigTasca = () => {
    setArray([...arrayTasca, newTasca]);
  }

  const handleChange = (index) => {
    const arrBorrat = [...arrayTasca];
    console.log(index)
    arrBorrat.splice(index, 1);
    setArray(arrayTasca);
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
          <ul>
          {
            arrayTasca.map((item, index) => {
              return(
                <li key={index} style={{listStyleType: 'none'}}><input type='checkbox' onClick={() => handleChange(index)} />{item}</li>
              )
            })
          }
          </ul>
        </div>
        
      </header>
    </div>
  );
}

export default App;
