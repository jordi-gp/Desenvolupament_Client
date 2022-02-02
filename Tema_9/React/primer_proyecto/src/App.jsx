import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
    
  render() {
    //console.log(this.props.title);
    const title = this.props.title;

    console.log(title);

    var h1class = {
      textAlign: 'center',
      color: 'red',
      fontWeight: 'bold',
      backgroundColor: 'lightblue'
    }

    var h2class = {color: 'darked'}

    return (
      <div>
        <h1 style={h1class}>React no m'agrada</h1>
        <h2 style={h2class}>Yo soles vuic ser feliç :c</h2>
        <p>{this.props.title}</p>
      </div>
    )
  }
}


// class App extends React.Component {
//   arrowHandleClick = (e) => {
//     e.preventDefault();
//     alert('The first link was clicked');
//   }

//   handleClick(e) {
//     e.preventDefault();
//     alert("The second link was clicked");
//   }
  
//   render() {
//     return (
//       <div>
//         <button className='btn btn-primary' onClick={() => alert("It works")}>
//           Click on this button
//         </button>
//         <a href='#' onClick={this.arrowHandleClick}>
//           Click first link
//         </a>
//         <a href='#' onClick={(e) => this.handleClick(e)}>
//           Click second link
//         </a>
//       </div>
//     );
//   }
// }

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
