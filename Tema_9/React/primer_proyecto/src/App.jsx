//Librerias importadas
import React, {Component} from 'react';
import propTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

/*
* COSES A PREGUNTAR
* 1-El tema del 'super(props)'
* 2-'let numbers = this.state.numbers' ¿?
* 3-El tema del '<li>' amb les 'key{x}'
*/

//Actividad sobre estados en React
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Default',
      time: new Date().toLocaleDateString(),
      number: 0,
      numbers: []
    }
  }

  changeState() {
    let number = Math.round(Math.random() * 4);
    let numbers = this.state.numbers;
    numbers.push(number);

    this.setState({
      time: new Date().toLocaleDateString,
      numbers: numbers,
      number: number,
      title: ((number % 2 === 0) ? 'It is even' : 'It is odd')
    })
    console.log('changestate --> ', this.state)
  }

  render() {
    console.log('Render was called -->', this.state);

    const colors = ['red', 'yellow', 'green', 'blue', 'orange'];
    const color = colors[this.state.number];

    return (
      <div className="App" style={{backgroundColor: color}}>
        <header className="App-heade">
          <img src={logo} className='App-logo' alt='logo' />
          <h1>
            {this.state.title} - {this.state.number}
          </h1>
        </header>
        <div className="App-intro">
          <div>{this.state.time}</div>
          Press this button to change state
        </div>
        <div>
          <button onClick={() => this.changeState()}>
            Change state
          </button>
        </div>
        <div>
          Generated numbers
            <ul>
              {this.state.numbers.map((x) => (
                <li key={x}> {x} </li>
              ))}
            </ul>
        </div>
      </div>
    )
  }
}

export default App;

//Activitat guiada amb React
/*class App extends Component {
  static defaultProps = {
    title: 'Default title',
    text: 'Default text',
    version: 0,
    technologies: [],
    fun: this.dummy
  }

  dummy() {
    console.log('I do nothing');
  }
  
  render() {
    const text = this.props.title;
    const version = this.props.version;

    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" className="App-logo" />
          <h1 className="App-title">
            {this.props.title} v {this.props.version}
          </h1>
        </header>
        <p className="App-intro">
          {text}
        </p>
        <button onClick={this.props.fun}>
          Click me
        </button>
      </div>
    )
  }
}

//export default App;

App.propTypes = {
  title: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  version: propTypes.number.isRequired,
  technologies: propTypes.array.isRequired,
  fun: propTypes.func.isRequired
}*/

/*class App extends React.Component {
  static defaultProps = {
    title: "Default title",
    version: 0
  }

  render() {
    //console.log(this.props.title);
    const title = this.props.title;
    const tech = this.props.tech;
    const version = this.props.version;

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
        <h1>{title}</h1>
        <h2>{tech[0]}</h2>
        <h3>{version}</h3>
      </div>
    )
  }
}

//export default App;

App.propTypes = {
  title: PropType.string.isRequired
}*/

/*
class App extends React.Component {
  arrowHandleClick = (e) => {
    e.preventDefault();
    alert('The first link was clicked');
  }

  handleClick(e) {
    e.preventDefault();
    alert("The second link was clicked");
  }
  
  render() {
    return (
      <div>
        <button className='btn btn-primary' onClick={() => alert("It works")}>
          Click on this button
        </button>
        <a href='#' onClick={this.arrowHandleClick}>
          Click first link
        </a>
        <a href='#' onClick={(e) => this.handleClick(e)}>
          Click second link
        </a>
      </div>
    );
  }
}*/

//export default App;

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

//export default App;