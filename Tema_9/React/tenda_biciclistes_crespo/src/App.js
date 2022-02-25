import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Logout from './components/logout';
import Productes from './components/productes';
import Error404 from './components/error404';
import Footer from './components/footer';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>
      <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/productes' element={<Productes />} />
            <Route path='/404' element={<Error404 />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
