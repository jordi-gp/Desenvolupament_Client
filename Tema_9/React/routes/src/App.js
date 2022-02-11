import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Error404 from './Components/error404';
import Header from './Components/header';
import Home from './Components/home';
import About from './Components/about';
import Categories from './Components/categories';
import Contacto from './Components/contacto';
import Footer from './Components/footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>
      <Header />
        <Container>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/about' element={ <About />} />
            <Route path='/contacto' element={ <Contacto /> } />
            <Route path='/categoria/:id' element={ <Categories/> } />
            <Route path='/404' element={ <Error404 /> } />
            <Route path='*' element={ <Error404 /> } />
          </Routes>
        </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
