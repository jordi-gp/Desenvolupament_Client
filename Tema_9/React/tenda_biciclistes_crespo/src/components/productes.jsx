import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';

const Productes = () => {
    //URL de la API
    const api = "https://api.tendaciclista.ccpegoilesvalls.es/api/productos";
    var token = JSON.parse(localStorage.getItem('auth-token'));


    const [produc, setProducts] = useState([]);

    const obtindreProductes = () => {
        fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data.data.data);
        })
    }

    useEffect(() => {
        obtindreProductes();
    }, []);

    return (
        <div>
            <h1>Productes</h1>
            <button className='btn btn-primary'>Agregar Producte</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Descripció</th>
                        <th scope='col'>Preu</th>
                        <th scope='col'>Talles</th>
                        <th scope='col'>Accions</th>
                    </tr>
                </thead>
                {
                    produc.map(item => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{item.nombre}</td>
                                    <td>{item.precio}€</td>
                                    <td>{item.tallas+""}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Productes;