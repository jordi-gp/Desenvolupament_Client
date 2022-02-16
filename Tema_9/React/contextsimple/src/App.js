import './App.css';
import { valores, appContext } from './components/contextData';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <appContext.Provider value={valores}>
        <Header />
      </appContext.Provider>
    </div>
  );
}

export default App;
