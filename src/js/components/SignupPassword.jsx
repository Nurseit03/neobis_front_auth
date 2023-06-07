import {React, useState, useEffect} from 'react'
import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import show_password from '../../img/show_password.png';
import hide_password from '../../img/hide_password.png';
import {useFormik} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import signupPassword from '../schemas/signupPassword.js'
import axios from '../../api/api.js';

const initialValues = {
    password: '',
    confirmPassword: ''
};


const SignupPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); //Состояние для отслеживания видимости пароля
    
    const onSubmit = async (values, actions) => {
        if(values.password == values.confirmPassword && isPasswordValid && isDigitPresent && isSpecialCharPresent && isPasswordConfirmed){
        console.log('Form data:', values);
        
        //Получение существующих данных из localStorage
        const existingData = JSON.parse(localStorage.getItem('formData'));

        //Обновление существующих данных с новыми данными о паролях
        const updatedData = {
            ...existingData,
            password: values.password,
            confirmPassword: values.confirmPassword
        };

        //Сохранение обновленных данных в localStorage
        localStorage.setItem('formData', JSON.stringify(updatedData));

        handleSignup(updatedData);
        actions.resetForm();

        navigate("/");
        }
    };  

    const handleSignup = async (user) => {
        try {
          const response = await axios.post("/register-update/", user);
    
          if (!(response.status === 201 || response.status === 200)) {
            console.log(response)
            throw new Error("Network response was not ok");
          }
    
          console.log(response);
          return response;
        } catch (error) {
          console.log("Error:", error)
        }
      }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validtionSchema: signupPassword  
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword); 
    };


    const isPasswordValid = formik.touched.password && !formik.errors.password && formik.values.password && /[A-Z]/.test(formik.values.password);
    const isDigitPresent = formik.touched.password && !formik.errors.password && formik.values.password.match(/^(?=.*\d)/);
    const isSpecialCharPresent = formik.touched.password && !formik.errors.password && formik.values.password.match(/^(?=.*[!@#$%^&*()])/);
    const isPasswordConfirmed = formik.touched.confirmPassword && !formik.errors.confirmPassword && formik.values.confirmPassword && formik.values.password === formik.values.confirmPassword;

    return (
        <>
        <div className="form">
            <button className="return__button"><Link to="/Signup"><img src={vector_left} alt="return"/></Link></button>
            <img src={smile} alt="Smile" id="smile__img"/>
            <h2 className="form__title">Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <input className="form__input" method="post" type="text" name="password" id="password" placeholder="Пароль" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                <div>
                    <input className="form__input" method="post" type={showPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" placeholder="Повторите пароль" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword}/>
                    <button id="show__password__button" type="button" onClick={handleShowPassword}><img src={showPassword ? hide_password : show_password} alt={showPassword ? 'hide' : 'show'} /></button>
                </div>
                <ul className="conditions">
                    <li className={isPasswordValid ? 'valid' : 'invalid'}>Заглавная буква</li>
                    <li className={isDigitPresent ? 'valid' : 'invalid'}>Цифры</li>
                    <li className={isSpecialCharPresent ? 'valid' : 'invalid'}>Специальные символы</li>
                    <li className={isPasswordConfirmed ? 'valid' : 'invalid'}>Совпадение пароля</li>
                </ul>
                <button type="submit"  className={`form__button ${formik.values.password && formik.values.confirmPassword ? 'form__button--active' : ''}`} disabled={!formik.values.password && !formik.values.confirmPassword && !formik.errors.password && !formik.errors.confirmPassword}>Далее</button>
            </form>
        </div>
        </>
    )
}

export default SignupPassword;
