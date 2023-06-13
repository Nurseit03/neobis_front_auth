import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import smile from '../../img/smile.png';
import bell from '../../img/bell.png'
import show_password from '../../img/show_password.png';
import hide_password from '../../img/hide_password.png';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import ReactModal from 'react-modal';
import loginSchema from '../schemas/loginSchema.js';
import axios from '../../api/axios.js';

const initialValues = {
    email:'',
    password:''
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const modalText = location.state ? location.state.modalText : '';
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSubmit = async (values, actions) => {
        handleLogin(values);
        actions.resetForm();

        console.log('Form data:',values);
    };
    
    const handleLogin = async (user) => {
        // console.log(user);
        // console.log(JSON.stringify(user));
        try {
          const response = await axios.post("/login/", user);
    
          if (!(response.status === 201 || response.status === 200)) {
            console.log(response)
            throw new Error("Network response was not ok");
          }
    
          setShowError(false);
          navigate('/Profile');

          console.log(response);
          return response;
        } catch (error) {
          setShowError(true);
          console.log("Error:", error);
        }
      }

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

    const openModal = () => {
        setIsModalOpen(true);
        setTimeout(() => {
        closeModal();
        setIsModalOpen(false);
        }, 3000);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (location.state && location.state.isModalOpen) {
        openModal();
        }
    }, [location.state]);

    return (
        <>
        <div className="form">
            <img src={smile} alt="Smile" id="smile__img"/>
            <form onSubmit={formik.handleSubmit}>
                <input className="form__input" type="text" name="email" id="email" placeholder="Электронная почта" onChange={formik.handleChange} value={formik.values.email}/>
                <div>
                <input className="form__input" type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Пароль" onChange={formik.handleChange} value={formik.values.password}/>
                <button id="show__password__button" type="button" onClick={handleShowPassword}><img src={showPassword ? hide_password : show_password} alt={showPassword ? 'hide' : 'show'} alt=""/></button>
                </div>
                <div>
                    <Link to="/PasswordReset" className="forgot__password"><b>Забыли пароль?</b></Link>
                    {showError ? (<div className="error">Неверный логин или пароль</div>) : null}
                </div>
                <button type="submit"  id="form__submit__button" className={`form__button ${formik.values.email && formik.values.password ? 'form__button--active' : ''}`} disabled={!formik.values.email || !formik.values.password}>Войти</button>
            </form>
            <Link to="/Signup" id="get__started">Начать пользоваться</Link>
        </div>
        <ReactModal
            isOpen={isModalOpen}
            contentLabel="successActionModal"
            style={{
                content: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px 20px',
                gap: '10px',
                position: 'absolute',
                width: '350px',
                height: '60px',
                background: '#FFFFFF',
                boxShadow: '0px 2px 12px rgba(80, 85, 92, 0.12)',
                borderRadius: '16px',
                top: '5%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                },
                overlay: {
                    background: 'none',
                  }
            }}
            >
            <div style={{ overflow: 'hidden' }}>
                <img src={bell} id="bell__img" alt=""/>
                <b>{modalText}</b>
            </div>
        </ReactModal>
        </>
    )
}

export default Login;
