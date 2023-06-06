import React from 'react';
import {useFormik} from 'formik';
import smile from '../../img/smile.png';
import { Link } from 'react-router-dom';
import loginSchema from '../schemas/loginSchema.js';
import reg from '../../api/api.js';

const initialValues = {
    email:'',
    password:''
};

const onSubmit = values => {
    console.log('Form data:',values);
};

const Login = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginSchema,
        validateOnChange: false, 
        validateOnBlur: false
    });

    return (
        <>
        <div className="form">
            <img src={smile} alt="Smile" id="smile__img"/>
            <form onSubmit={formik.handleSubmit}>
                <input className="form__input" type="text" name="email" id="email" placeholder="Электронная почта" onChange={formik.handleChange} value={formik.values.email}/>
                <input className="form__input" type="password" name="password" id="password" placeholder="Пароль" onChange={formik.handleChange} value={formik.values.password}/>
                <div>
                    <Link to="/PasswordReset" className="forgot__password"><b>Забыли пароль?</b></Link>
                    {formik.errors.email || formik.errors.password ? (<div className="error">Неверный логин или пароль</div>) : null}
                </div>
                <button type="submit"   className={`form__button ${formik.values.email && formik.values.password ? 'form__button--active' : ''}`} disabled={!formik.values.email || !formik.values.password}>Войти</button>
            </form>
            <Link to="/Signup" id="get__started">Начать пользоваться</Link>
        </div>
        </>
    )
}

export default Login;
