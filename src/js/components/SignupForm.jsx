import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import React from 'react'
import {useFormik} from 'formik';
import { Link , useNavigate} from 'react-router-dom';
import validationSchema from '../schemas/index.js'

const initialValues = {
    name:'',
    lastName:'',
    birthdate:'',
    email:''
};

const SignupForm = () => {
    
    const navigate = useNavigate();

    const onSubmit = values => {
        console.log('Form data:',values);
        navigate('/SignupPassword');
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
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
                
                <button type="submit"  className={`form__button ${formik.values.name && formik.values.lastName && formik.values.birthdate && formik.values.email ? 'form__button--active' : ''}`} disabled={!formik.values.name || !formik.values.lastName || !formik.values.birthdate || !formik.values.email}>Зарегистрироваться</button>
            </form>
        </div>
        </>
    )
}

export default SignupForm;
