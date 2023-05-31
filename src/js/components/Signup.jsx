import React from 'react'
import smile from '../../img/smile.png';
import {useFormik} from 'formik';
import { Link } from 'react-router-dom';

const initialValues = {
    name:'',
    lastName:'',
    date:'',
    email:''
};

const onSubmit = values => {
    console.log('Form data:',values);
};

const validate = values => {
    let errors = {};

    if(!values.name){
        errors.name = 'Required';
    }
    if(!values.lastName){
        errors.lastName = 'Required';
    }
    if(!values.date){
        errors.date = 'Required';
    }
    if(!values.email){
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email format';
    }

    return errors;
}

const Signup = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });


    return (
        <>
        <div className="form">
            <img src={smile} alt="Smile"/>
            <h2>Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <input className="form__input" type="text" name="name" id="name" placeholder="Имя" onChange={formik.handleChange} value={formik.values.name}/>
                <input className="form__input" type="text" name="lastName" id="lastName" placeholder="Фамилия" onChange={formik.handleChange} value={formik.values.lastName}/>
                <input className="form__input" type="date" name="date" id="date" placeholder="Дата рождения" onChange={formik.handleChange} value={formik.values.date}/>
                <input className="form__input" type="email" name="email" id="email" placeholder="Электронная почта" onChange={formik.handleChange} value={formik.values.email}/>
                <button>Зарегистрироваться</button>
            </form>
        </div>
        </>
    )
}

export default Signup;
