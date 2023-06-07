import {React, useState} from 'react';
import {useFormik} from 'formik';
import smile from '../../img/smile.png';
import show_password from '../../img/show_password.png';
import hide_password from '../../img/hide_password.png';
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
    const [showPassword, setShowPassword] = useState(false); // Состояние для отслеживания видимости пароля

    
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginSchema,
        validateOnChange: false, 
        validateOnBlur: false
    });
    
    const handleShowPassword = () => {
        setShowPassword(!showPassword); 
    };

    return (
        <>
        <div className="form">
            <img src={smile} alt="Smile" id="smile__img"/>
            <form onSubmit={formik.handleSubmit}>
                <input className="form__input" type="text" name="email" id="email" placeholder="Электронная почта" onChange={formik.handleChange} value={formik.values.email}/>
                <div>
                <input className="form__input" type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Пароль" onChange={formik.handleChange} value={formik.values.password}/>
                <button id="show__password__button" type="button" onClick={handleShowPassword}><img src={showPassword ? hide_password : show_password} alt={showPassword ? 'hide' : 'show'} /></button>
                </div>
                <div>
                    <Link to="/PasswordReset" className="forgot__password"><b>Забыли пароль?</b></Link>
                    {formik.errors.email || formik.errors.password ? (<div className="error">Неверный логин или пароль</div>) : null}
                </div>
                <button type="submit"  id="form__submit__button" className={`form__button ${formik.values.email && formik.values.password ? 'form__button--active' : ''}`} disabled={!formik.values.email || !formik.values.password}>Войти</button>
            </form>
            <Link to="/Signup" id="get__started">Начать пользоваться</Link>
        </div>
        </>
    )
}

export default Login;
