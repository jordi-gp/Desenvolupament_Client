import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from 'react-service-worker';

const myText = 'This app rocks!';
const doIt = () => {
  alert('It works')
};

ReactDOM.render (
  <App title='SuperApp' text={myText} fun={doIt} />,
  document.getElementById('root')
)

registerServiceWorker();

/*
let technologyData = ['React', 'Vue', 'Angular'];

ReactDOM.render(
  <React.StrictMode>
    <App title="My title" tech = {technologyData} />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
