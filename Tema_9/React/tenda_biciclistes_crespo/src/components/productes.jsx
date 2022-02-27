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
import { useFormik} from 'formik';

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
    
    //Token d'autenticació
    var token = JSON.parse(localStorage.getItem('auth-token'));

    const [produc, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    
    const formik = useFormik({
        initialValues: { nombre: '',precio:0 , tallas:''},
        validationSchema: SignupSchema,
    });


    useEffect(() => {
        comprobaLog();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const obtindreProductes = () => {
    //URL de la API
        const api = "https://api.tendaciclista.ccpegoilesvalls.es/api/productos";
        fetch( api , {
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
        if(JSON.parse(localStorage.getItem("auth-token")) == null){
            navegacio('/login')
        } else {
            obtindreProductes();
        }
    }

    const afigProducte = (evt) => {
        var urlApi = "https://api.tendaciclista.ccpegoilesvalls.es/api/productos";
        var token = JSON.parse(localStorage.getItem("auth-token"));

        evt.preventDefault();
        //console.log(evt)
        //console.log(formik.errors)
        //console.log(formik.values)
        //Cal que controres els errors ja que no se perquè no ho fa el 
        //setIsModalOpen(false);

        var producte = {
            nombre: formik.values.nombre,
            precio: formik.values.precio,
            tallas: [formik.values.tallas]
        }

        fetch(urlApi, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "auth-token": token.token
            },
            body: JSON.stringify(producte)
        })
        .then(response => response.json())
        .then(setIsModalOpen(false))
        .catch((error) => {
            console.log("Error =>", error);
        })
    }

    const editaProducte = (item) => {
        setIsModalEdit(true);

        const talla = item.tallas.toString();
        formik.values.id = item._id
        formik.values.nombre = item.nombre
        formik.values.precio = item.precio
        formik.values.tallas = talla
    }

    const setEdit = (evt) => {
        evt.preventDefault();

        var urlApi = "https://api.tendaciclista.ccpegoilesvalls.es/api/productos"+formik.values.id;
        var token = JSON.parse(localStorage.getItem("auth-token"));

        var newProd = {
            nombre: formik.values.nombre,
            precio: formik.values.precio,
            tallas: [formik.values.tallas]
        }

        console.log(urlApi)
        console.log(newProd)
        console.log(token.token)

        fetch("https://api.tendaciclista.ccpegoilesvalls.es/api/productos/"+formik.values.id, {
            method: "PUT",
            header: {
                "Accept": "application/json",
                "Content-Type":"application/json",
                "auth-token":token.token
            },
            body: JSON.stringify(newProd)
        })
        .then(response => response.json())
        .then(setIsModalEdit(false))
        .catch((error) => {
            console.log("Error =>", error)
        })
    }

    return (
        <div>
            <h1>Productes</h1>
            <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>Agregar Producte</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Descripció</th>
                        <th scope='col'>Preu</th>
                        <th scope='col'>Talles</th>
                        <th scope='col'>Accions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    produc.map((item) => {
                        return (
                                <tr key={item._id}>
                                    <td >{item.nombre}</td>
                                    <td>{item.precio}€</td>
                                    <td>{item.tallas+" "}</td>
                                    <td>
                                        <button type='button' className='btn btn-primary mb-1' onClick={() => {editaProducte(item)}}>
                                            <BsPencilSquare />
                                        </button>
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-danger mt-1'>
                                            <BsFillTrashFill />
                                        </button>
                                    </td>
                                </tr>
                        )
                        
                    })
                }
                </tbody>
            </table>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader>
                    <h1>Nou Producte</h1>
                    <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
                        <BsXLg />
                    </Button>{' '}
                </ModalHeader>
                <ModalBody>
                            <form>
                                {/* Camp del nom del producte */}
                                <label htmlFor="nombre" className='mb-2'>Nom del producte</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                                    />
                                        {formik.touched.nombre && formik.errors.nombre ? (
                                        <div className="text-danger">{formik.errors.nombre}</div> ) : null} 
                                {/* Camp del preu del producte */}
                                <label htmlFor="precio" className='mt-2 mb-2'>Preu del producte</label>
                                <input 
                                    type="number" 
                                    name="precio" 
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.precio}
                                    />
                                        {formik.touched.precio && formik.errors.precio ? (
                                        <div className="text-danger">{formik.errors.precio}</div> ) : null} 
                                <label htmlFor="talla" className='mt-2 mb-2'>Talla del producte</label>
                                <input 
                                    type="text" 
                                    name="tallas" 
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.tallas}
                                    />
                                    {formik.touched.tallas && formik.errors.tallas ? (
                                        <div className="text-danger">{formik.errors.tallas}</div> ) : null}
                    <button className='btn btn-primary mt-3 mb-3'  onClick={(evt) => afigProducte(evt)}>
                        Insertar
                    </button>
                    <button className='btn btn-secondary ms-3' type="button" onClick={(evt) =>{ evt.preventDefault(); setIsModalOpen(false)}}>
                        Cancelar
                    </button>
                    </form>
                    </ModalBody>
                    <ModalFooter>
                </ModalFooter>
            </Modal>
            {/* Modal per editar el producte */}
            <Modal show={isModalEdit} onClose={() => setIsModalEdit(false)}>
                <ModalHeader>
                    <h1>Nou Producte</h1>
                    <Button variant='secondary' onClick={() => setIsModalEdit(false)}>
                        <BsXLg />
                    </Button>{' '}
                </ModalHeader>
                <ModalBody>
                            <form>
                                {/* Camp del nom del producte */}
                                <label htmlFor="nombre" className='mb-2'>Nom del producte</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                                    />
                                        {formik.touched.nombre && formik.errors.nombre ? (
                                        <div className="text-danger">{formik.errors.nombre}</div> ) : null} 
                                {/* Camp del preu del producte */}
                                <label htmlFor="precio" className='mt-2 mb-2'>Preu del producte</label>
                                <input 
                                    type="number" 
                                    name="precio" 
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.precio}
                                    />
                                        {formik.touched.precio && formik.errors.precio ? (
                                        <div className="text-danger">{formik.errors.precio}</div> ) : null} 
                                <label htmlFor="talla" className='mt-2 mb-2'>Talla del producte</label>
                                <input 
                                    type="text" 
                                    name="tallas" 
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.tallas}
                                    />
                                    {formik.touched.tallas && formik.errors.tallas ? (
                                        <div className="text-danger">{formik.errors.tallas}</div> ) : null}
                    <button className='btn btn-primary mt-3 mb-3' id={formik.values.id} onClick={(evt) => setEdit(evt)}>
                        Actualitzar
                    </button>
                    <button className='btn btn-secondary ms-3' type="button" onClick={(evt) =>{ evt.preventDefault(); setIsModalEdit(false)}}>
                        Cancelar
                    </button>
                    </form>
                    </ModalBody>
                    <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Productes;