import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').max(20, 'Too long').required('Required')
});

//Validación de un formulario de login con React
class Formulari extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Formik initialValues={{email:"", password:""}}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            console.log(values)
                        }}
                    >
                    {({errors, touched}) => (
                        <div>
                            <div className="row mb-5">
                                <div className="col-lg-12 text-center">
                                    <h1 className="mt-5">
                                        Login
                                    </h1>
                                </div>
                            </div>
                            <Form>
                                <div className="mb-3 row">
                                    <label htmlFor="email" className="col-sm-2 col-form-label">
                                        Email
                                    </label>
                                    <div className="col-sm-10">
                                        <Field 
                                            type="email"
                                            name="email"
                                            placeholder="example@gmail.com"
                                            autoComplete="on"
                                            className="form-control"
                                        />
                                        {errors.email && touched.email ?
                                            <div>{errors.email}</div> : null}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="password" className="col-sm-2 col-form-label">
                                        Password
                                    </label>
                                    <div className="col-sm-10">
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            className="form-control"
                                        />
                                        {errors.password && touched.password ? (
                                            <div>{errors.password}</div>) : null}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">
                                    Enviar
                                </button>
                            </Form>
                        </div>
                    )}
                    </Formik>
                </div>
            </div>
        );
    }
}

export default Formulari;