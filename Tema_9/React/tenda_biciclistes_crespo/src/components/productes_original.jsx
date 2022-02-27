import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//Botons i finestar modal utilitzats
import { Form, Modal, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
//Icones utilitzades
import { BsPencilSquare } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsXLg } from 'react-icons/bs';

//useNavigate
import { useNavigate } from 'react-router-dom';

//Formulari per afegir un nou producte
import { Formik, Field } from 'formik';

//Validacions del formulari
import * as Yup from 'yup';


const Productes = () => {
    //Validacions del formulari
    const SignupSchema = Yup.object().shape({
        nombre: Yup.string()
        .min(4, "El nom del producte ha de contindre almenys 4 caracters")
        .max(60, "El nom del producte no pot superar els 60 caracters")
        .required("S'ha d'introduïr el nom del producte"),
        precio: Yup.number()
        .min(0, "El preu no pot ser inferior a 0")
        .required("S'ha d'introduïr el preu del producte"),
        tallas: Yup.string()
        .required("S'ha d'introduïr la talla de la prenda")
    })

    //Navegació entre pàgines
    const navegacio = useNavigate();

    //URL de la API
    const api = "https://api.tendaciclista.ccpegoilesvalls.es/api/productos";
    
    //Token d'autenticació
    var token = JSON.parse(localStorage.getItem('auth-token'));

    const [produc, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    function comprobaLog() {
        var tokenVerificacio = JSON.parse(localStorage.getItem("auth-token"));

        if(tokenVerificacio == null){
            navegacio('/login');
            console.log("no hi ha token d'acces");
        } else {
            obtindreProductes();
        }
    }

    const afigProducte = (values) => {
        console.log(values)
        //setIsModalOpen(false);
    }
    
    useEffect(() => {
        comprobaLog();
    }, []);

    return (
        <div>
            <h1>Productes</h1>
            <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>Agregar Producte</button>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader>
                    <h1>Nou Producte</h1>
                    <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
                        <BsXLg />
                    </Button>{' '}
                </ModalHeader>
                <ModalBody>
                    <Formik initialValues={{nombre:"", precio:0, tallas:""}} validationSchema={SignupSchema} onSubmit={(values) => console.log(values)}>
                        {({errors, touched}) => (
                            <Form>
                                {/* Camp del nom del producte */}
                                <label htmlFor="nombre" className='mb-2'>Nom del producte</label>
                                <Field type="text" name="nombre" className="form-control" />
                                {
                                    errors.nombre && touched.nombre ?
                                        <div className='text-danger fw-bold'>{errors.nombre}</div> : null
                                }
                                {/* Camp del preu del producte */}
                                <label htmlFor="precio" className='mt-2 mb-2'>Preu del producte</label>
                                <Field type="number" name="precio" className="form-control" />
                                {
                                    errors.precio && touched.precio ?
                                        <div className='text-danger fw-bold'>{errors.precio}</div> : null
                                }
                                <label htmlFor="talla" className='mt-2 mb-2'>Talla del producte</label>
                                <Field type="text" name="tallas" className="form-control" />
                                {
                                    errors.tallas && touched.tallas ?
                                        <div className='text-danger fw-bold'>{errors.tallas}</div> : null
                                }
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    <p>
                        
                    </p>
                    <button className='btn btn-primary' onClick={(values) => console.log(values)}>
                        Insertar
                    </button>
                    <button className='btn btn-secondary' onClick={() => setIsModalOpen(false)}>
                        Cancelar
                    </button>
                </ModalFooter>
                
            </Modal>
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
                    produc.map((item, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td key={index}>{item.nombre}</td>
                                    <td>{item.precio}€</td>
                                    <td>{item.tallas+""}</td>
                                    <td>
                                        <button type='button' className='btn btn-primary mb-1'>
                                            <BsPencilSquare />
                                        </button>
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-danger mt-1'>
                                            <BsFillTrashFill />
                                        </button>
                                    </td>
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