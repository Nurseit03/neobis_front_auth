import React from 'react'
import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import {useFormik} from 'formik';
import { Link } from 'react-router-dom';
// import basicSchema from '../schemas/index.js'

const initialValues = {
    name:'',
    lastName:'',
    date:'',
    email:''
};

const onSubmit = values => {
    console.log('Form data:',values);
};

const SignupForm = () => {

    const formik = useFormik({
        initialValues,
        onSubmit
    });
    
    return (
        <>
        <div className="form">
            <button className="return__button"><Link to="/Signup"><img src={vector_left} alt="return"/></Link></button>
            <img src={smile} alt="Smile" id="smile__img"/>
            <h2 className="form__title">Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <input className="form__input" type="text" name="name" id="name" placeholder="Имя" onChange={formik.handleChange} value={formik.values.name}/>
                <input className="form__input" type="text" name="lastName" id="lastName" placeholder="Фамилия" onChange={formik.handleChange} value={formik.values.lastName}/>
                <input className="form__input" type="date" name="date" id="date" placeholder="Дата рождения" onChange={formik.handleChange} value={formik.values.date}/>
                <input className="form__input" type="email" name="email" id="email" placeholder="Электронная почта" onChange={formik.handleChange}value={formik.values.email}/>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
        </>
    )
}

export default SignupForm;
