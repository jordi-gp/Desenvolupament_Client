import React, { Component} from 'react';
import {Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';


class Header extends Component{
render (){
    return (
        <div className='container-fluid' style={{background:"#f8f9fa"}}>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Tenda Ciclista</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">Productos</Nav.Link>
                <Nav.Link href="/users">Pedidos</Nav.Link>
                <NavDropdown title="Area Personal" id="basic-nav-dropdown">
                    <NavDropdown.Item>Area Personal</NavDropdown.Item>
                    <NavDropdown.Item href="/register">Registrarse</NavDropdown.Item>
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
            </Navbar>  
        </div>
    )
}}

export default Header;