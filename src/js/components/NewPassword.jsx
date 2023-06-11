import React, {useState , useEffect} from 'react'
import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import show_password from '../../img/show_password.png';
import hide_password from '../../img/hide_password.png';
import {useFormik} from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios.js';

const initialValues = {
    password: '',
    confirm_password: ''
};

const NewPassword = () => {
    const [showPassword, setShowPassword] = useState(false); // Состояние для отслеживания видимости пароля
    const navigate = useNavigate();
    const { token, uidb64 } = useParams();

    // const uidb64 = "NDQ";
    // const token = "bpmac6-290703b5ee52196e70104d4d25a3e578";
    const [tokenValid , setTokenValid] = useState('loading');

    useEffect(() => {
      async function fetchData() {
        try {
          const res = await axios.get(`password-reset/${uidb64}/${token}/`);
          if(res.data.success === true){
            setTokenValid('Valid');
          }
            else {
              setTokenValid('Invalid');
            }
        } catch (error) {
          console.log("error:",error);
        }
      }
      fetchData();
    }, [uidb64,token]);
    ///
        
    const onSubmit = values => {
        if(values.password == values.confirm_password && isPasswordValid && isDigitPresent && isSpecialCharPresent && isPasswordConfirmed && isValidPasswordLength){
            console.log('Form data:', values);
            const user = {
              password: values.password,
              uidb64: uidb64,
              token: token
            }
            handleSetNewPassword(user);
            navigate('/', { state: { isModalOpen: true, modalText: "Пароль успешно сброшен!" } });
          }
    };

    const handleSetNewPassword = async (user) => {
        console.log(JSON.stringify(user));
        try {
          // const response = await axios.get(`/password-reset/${uidb64}/${token}`,JSON.stringify(user));
          const response = await axios.patch("/password-reset-complete/",user);
    
          if (response.status === 201) {
            console.log(response);
          } else {
            console.log(response);
            throw new Error("Network response was not ok");
          }
    
        } catch (error) {
          console.log("Error:", error);
        }
      }

    const handleShowPassword = () => {
        setShowPassword(!showPassword); 
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    const isPasswordValid = formik.touched.password && !formik.errors.password && formik.values.password && /[A-Z]/.test(formik.values.password);
    const isDigitPresent = formik.touched.password && !formik.errors.password && formik.values.password.match(/^(?=.*\d)/);
    const isSpecialCharPresent = formik.touched.password && !formik.errors.password && formik.values.password.match(/^(?=.*[!@#$%^&*()])/);
    const isPasswordConfirmed = formik.touched.confirm_password && !formik.errors.confirm_password && formik.values.confirm_password && formik.values.password === formik.values.confirm_password;
    const isValidPasswordLength = formik.values.password.length >= 8 && formik.values.password.length <= 15;

    ///
    if(tokenValid==='loading'){
      return <h1>Loading</h1>
    }
    
    if(tokenValid==='Invalid'){
      return <h1>Not found page</h1>
    }
    ///

    return (
        <>
        <div className="form">
            <button className="return__button"><Link to="/PasswordReset"><img src={vector_left} alt="return"/></Link></button>
            <img src={smile} alt="Smile" id="smile__img"/>
            <h2 className="form__title">Новый пароль</h2>
            <form onSubmit={formik.handleSubmit}>
                <input className={isValidPasswordLength ? 'form__input' : 'form__input invalid-border'} type="text" name="password" id="password" placeholder="Придумайте пароль" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                <div>
                <input className={isValidPasswordLength ? 'form__input' : 'form__input invalid-border'} type={showPassword ? 'text' : 'password'} name="confirm_password" id="confirm_password" placeholder="Повторите пароль" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirm_password}/>
                <button id="show__password__button" type="button" onClick={handleShowPassword}><img src={showPassword ? hide_password : show_password} alt={showPassword ? 'hide' : 'show'} /></button>
                </div>
                <ul className="conditions">
                <li className={isPasswordValid ? 'valid' : 'invalid'}>Заглавная буква</li>
                <li className={isDigitPresent ? 'valid' : 'invalid'}>Цифры</li>
                <li className={isSpecialCharPresent ? 'valid' : 'invalid'}>Специальные символы</li>
                <li className={isPasswordConfirmed ? 'valid' : 'invalid'}>Совпадение пароля</li>
                </ul>
                <button type="submit"  className={`form__button ${formik.values.password && formik.values.confirm_password ? 'form__button--active' : ''}`} disabled={!formik.values.password || !formik.values.confirm_password}>Сбросить</button>
            </form>
        </div>
        </>
    )
}

export default NewPassword;

