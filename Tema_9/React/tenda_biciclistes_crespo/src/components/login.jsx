import React from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

//Validacions del formulari
const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email incorrecte.')
        .required("S'ha d'introduir un correu electrònic."),
    password: Yup.string()
        .min(6, 'La contrasenya ha de contindre almenys 6 caracters.')
        .max(20, 'La contrasenya no pot superar els 20 caracters.')
        .required("S'ha d'introduir una contrasenya!")
});

//Estrucutra del formulari
class Login extends React.Component {
    render() {
        return (
            <Formik initialValues={{email:"", password:""}} validationSchema={SignupSchema} onSubmit={ values => {console.log(values)}}>
                {({errors, touched}) => (
                    <div className="container-fluid">
                        <div className="row m-3 p-3 col-4 mx-auto d-block" style={{background: "lightgray", borderRadius:"5px"}}>
                            <h2 className='text-primary'>Login</h2>
                            <Form initialValues={{email:"", password:""}} validationSchema={SignupSchema} onSubmit={values => { console.log(values)}}>
                                <div className="mb-3 row d-flex flex-column">
                                    <label htmlFor="email" className="col-sm-2 col-form-label">
                                        Email
                                    </label>
                                    <div className="col-sm-10">
                                        <Field type="email" name="email" placeholder="example@gmail.com" autoComplete="on" className="form-control"/>
                                        {
                                            errors.email && touched.email ?
                                                <div className='text-danger fw-bold'>{errors.email}</div> : null
                                        }
                                    </div>
                                </div>
                                <div className="mb-3 row d-flex flex-column">
                                    <label htmlFor="password" className="col-sm-2 col-form-label">
                                        Contrasenya
                                    </label>
                                    <div className="col-sm-10">
                                        <Field type="password" name="password" placeholder="Contrasenya" className="form-control"/>
                                        {
                                            errors.password && touched.password ?
                                                <div className='text-danger fw-bold'>{errors.password}</div> : null
                                        }
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">
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

export default Login;