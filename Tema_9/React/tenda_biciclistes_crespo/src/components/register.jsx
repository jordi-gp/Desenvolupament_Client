import React from 'react';
import { Formik, Form, Field } from 'formik';
//import { App } from './App';
import { withRouter } from '../withRouter';
import * as Yup from 'yup';

//URL de la api
const api = "https://api.tendaciclista.ccpegoilesvalls.es/api/register";

//Validacions del formulari
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(6, 'El nom ha de contindre almenys 6 caracters')
        .max(255, 'El nom no pot superar els 255 caracters')
        .required("S'ha d'introduir un nom"),
    email: Yup.string()
        .min(6, 'El correu ha de contindre almenys 6 caracters')
        .max(1024, 'El correu no pot superar els 1024 caracters')
        .email('Email incorrecte.')
        .required("S'ha d'introduir un correu electrònic."),
    password: Yup.string()
        .min(6, 'La contrasenya ha de contindre almenys 6 caracters.')
        .required("S'ha d'introduir una contrasenya."),
    passwordc: Yup.string()
        .min(6, 'La contrasenya ha de contindre almenys 6 caracters.')
        .oneOf([Yup.ref('password'), null], 'Les contrasenyes han de coincidir!')
        .required("S'ha d'introduir una contrasenya.")
});

//Register Amb Classes
class Register extends React.Component {
    mostraInfo = (values) => {
        var usuario = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        console.log(usuario);
    
        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            if(data.error != null) {
                console.log("Error => "+data.error);
            } else {
                this.props.navigate('/login');
            }
        })
        .catch((error) => {
            console.log("Ha ocorregut un error =>", error);
        })
    }    

    render() {
        return (
            <Formik initialValues={{name:"", email:"", password:"", passwordc:""}} validationSchema={SignupSchema} onSubmit={(values) => this.mostraInfo(values)}>
                {({errors, touched}) => (
                    <div className="container-fluid">
                        <div className="row m-3 p-3 col-4 mx-auto d-block" style={{background: "lightgray", borderRadius:"5px"}}>
                            <h2 className='text-primary'>Registre</h2>
                            <Form>
                                {/*Camp del nom*/}
                                <div className="mb-3 row d-flex flex-column">
                                    <label htmlFor="name" className='col-sm-2 col-form-label'>
                                        Nom
                                    </label>
                                    <div className="col-sm-10">
                                        <Field type="name" name="name" placeholder="Jordi" autoComplete="off" className="form-control" />
                                        {
                                            errors.name && touched.name ?
                                                <div className='text-danger fw-bold'>{errors.name}</div> : null
                                        }
                                    </div>
                                </div>
                                {/*Camp de email*/}
                                <div className="mb-3 row d-flex flex-column">
                                    <label htmlFor="email" className='col-sm-2 col-form-label'>
                                        Email
                                    </label>
                                    <div className="col-sm-10">
                                        <Field type="email" name="email" placeholder="example@gmail.com" autoComplete="on" className="form-control" />
                                        {
                                            errors.email && touched.email ?
                                                <div className="text-danger fw-bold">{errors.email}</div> : null
                                        }
                                    </div>
                                </div>
                                {/*Camp de contrasenya*/}
                                <div className="mb-3 row d-flex flex-column">
                                    <label htmlFor="password" className='col-sm-2 col-form-label'>
                                        Contrasenya
                                    </label>
                                    <div className="col-sm-10">
                                        <Field type="password" name="password" placeholder="Contrasenya" className="form-control" />
                                        {
                                            errors.password && touched.password ?
                                                <div className='text-danger fw-bold'>{errors.password}</div> : null
                                        }
                                    </div>
                                </div>
                                {/*Camp de contrasenya repetida*/}
                                <div className="mb-3 row d-flex flex-column">
                                    <label htmlFor="password" className='col-sm-6 col-form-label'>
                                        Contrasenya Repetida
                                    </label>
                                    <div className="col-sm-10">
                                        <Field type="password" name="passwordc" placeholder="Contrasenya Repetida" className="form-control" />
                                        {
                                            errors.passwordc && touched.passwordc ?
                                                <div className='text-danger fw-bold'>{errors.passwordc}</div> : null
                                        }
                                    </div>
                                </div>
                                <div className="row d-flex flex-column">
                                    <h4 className='text-danger'></h4>
                                </div>
                                <div className="row d-flex flex-column">
                                    <h2 className='text-danger' id="error"></h2>
                                </div>
                                <button className="btn btn-primary btn-block mt-2" type='submit'>
                                    Enviar
                                </button>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        )
    }
}

export default withRouter(Register);