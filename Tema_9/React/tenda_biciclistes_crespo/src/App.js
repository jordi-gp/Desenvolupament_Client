import React from 'react';
import './App.css';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import Footer from './components/footer';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Register />
      <Footer />
    </React.Fragment>
  );
}

export default App;
