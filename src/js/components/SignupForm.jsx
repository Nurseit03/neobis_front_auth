import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import {React,useState,useEffect} from 'react'
import {useFormik} from 'formik';
import { Link , useNavigate} from 'react-router-dom';
import basicSchema from '../schemas/index.js'
import axios from '../../api/api.js';

const initialValues = {
    name:'',
    lastName:'',
    birthdate:'',
    email:''
};

const SignupForm = () => {
    
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        handleSignup(values);
        actions.resetForm();

        console.log('Form data:',values);
        localStorage.setItem('formData', JSON.stringify(values));

        actions.resetForm();

        navigate('/SignupPassword');
    };


    const handleSignup = async (user) => {
        // console.log(user);
        // console.log(JSON.stringify(user));
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
        validationSchema: basicSchema,
        validateOnChange: false, 
        validateOnBlur: false
    });

    return (
        <>
        <div className="form">
            <button className="return__button"><Link to="/Signup"><img src={vector_left} alt="return"/></Link></button>
            <img src={smile} alt="Smile" id="smile__img"/>
            <h2 className="form__title">Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                <input className="form__input" type="text" name="name" id="name" placeholder="Имя" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
                {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                </div>

                <div className="form-control">
                <input className="form__input" type="text" name="lastName" id="lastName" placeholder="Фамилия" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName}/>
                {formik.errors.lastName ? <div className="error">{formik.errors.lastName}</div> : null}
                </div>

                <div className="form-control">
                <input className="form__input" type="date" name="birthdate" id="birthdate" placeholder="Дата рождения" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.birthdate}/>
                {formik.errors.birthdate ? <div className="error">{formik.errors.birthdate}</div> : null}
                </div>

                <div className="form-control">
                <input className="form__input" type="email" name="email" id="email" placeholder="Электронная почта" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                </div>
                
                <button type="submit"  className={`form__button ${formik.values.name && formik.values.lastName && formik.values.birthdate && formik.values.email ? 'form__button--active' : ''}`} disabled={!formik.values.name || !formik.values.lastName || !formik.values.birthdate || !formik.values.email}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
        </>
    )
}

export default SignupForm;
