import React from 'react'
import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import {useFormik} from 'formik';
import { Link } from 'react-router-dom';
import basicSchema from '../schemas/index.js'

const initialValues = {
    email:''
};

const onSubmit = values => {
    console.log('Form data:',values);
};


const Signup = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: basicSchema
    });

    return (
        <>
        <div className="form">
            <button className="return__button"><Link to="/"><img src={vector_left} alt="return"/></Link></button>
            <img src={smile} alt="Smile" id="smile__img"/>
            <h2 className="form__title">Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <input className="form__input" type="email" name="email" id="email" placeholder="Электронная почта" onChange={formik.handleChange}value={formik.values.email}/>
                <button type="submit">
                <Link to="/SignupForm">Далее</Link>
                </button>
            </form>
        </div>
        </>
    )
}

export default Signup
