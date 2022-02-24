import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import Error404 from './components/error404';
import Footer from './components/footer';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>
      <Header />
        <Container>
          <Routes>
            <Route path='/' element={ <Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/404' element={<Error404 />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
