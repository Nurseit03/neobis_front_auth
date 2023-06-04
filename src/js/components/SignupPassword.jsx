import React from 'react'
import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import {useFormik} from 'formik';
import { Link } from 'react-router-dom';

const initialValues = {
    password: '',
    confirmPassword: ''
};

const onSubmit = values => {
    if(values.password == values.confirmPassword){
    console.log('Form data:',values);
    }
};

const SignupPassword = () => {

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
                <input className="form__input" type="text" name="password" id="password" placeholder="Пароль" onChange={formik.handleChange} value={formik.values.password}/>
                <input className="form__input" type="text" name="confirmPassword" id="confirmPassword" placeholder="Потвердите пароль" onChange={formik.handleChange} value={formik.values.confirmPassword}/>
                <ul className="conditions">
                    <li>Заглавная буква</li>
                    <li>Цифры</li>
                    <li>Специальные символы</li>
                    <li>Совпадение пароля</li>
                </ul>
                <button type="submit">Далее</button>
            </form>
        </div>
        </>
    )
}

export default SignupPassword;
