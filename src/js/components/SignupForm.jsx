import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import React, {useState,useEffect} from 'react'
import {useFormik} from 'formik';
import { Link , useNavigate, useParams, useLocation} from 'react-router-dom';
import basicSchema from '../schemas/index.js'
import axios from '../../api/axios.js';

const initialValues = {
    first_name:'',
    last_name:'',
    date_born:'',
    phone_number:''
};


const SignupForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //
    const { token } = useParams();
    const [tokenValid , setTokenValid] = useState('loading');

    useEffect(() => {
      async function fetchData() {
        try {
          const res = await axios.get(`email-verify/?token=${token}`);
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
    }, [token]);
    ///
        

    const onSubmit = (values, actions) => {
        actions.resetForm();

        console.log('Form data:',values);
        localStorage.setItem('formData', JSON.stringify(values));

        actions.resetForm();
        handleSignupForm(values);

        navigate('/SignupPassword');
    };

    const handleSignupForm = async (user) => {
        // console.log(JSON.stringify(user));
        try {
          const response = await axios.put("/register-personal-info/",user)
    
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

        //
        if(tokenValid==='loading'){
            return <h1>Loading</h1>
          }
          
          if(tokenValid==='Invalid'){
            return <h1>Not found page</h1>
          }
        //

    return (
        <>
        <div className="form">
            <button className="return__button"><Link to="/Signup"><img src={vector_left} alt="return"/></Link></button>
            <img src={smile} alt="Smile" id="smile__img"/>
            <h2 className="form__title">Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                <input className="form__input" type="text" name="first_name" id="first_name" placeholder="Имя" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.first_name}/>
                {formik.errors.first_name ? <div className="error">{formik.errors.first_name}</div> : null}
                </div>

                <div className="form-control">
                <input className="form__input" type="text" name="last_name" id="last_name" placeholder="Фамилия" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.last_name}/>
                {formik.errors.last_name ? <div className="error">{formik.errors.last_name}</div> : null}
                </div>

                <div className="form-control">
                <input className="form__input" type="date" name="date_born" id="date_born" placeholder="Дата рождения" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.date_born}/>
                {formik.errors.date_born ? <div className="error">{formik.errors.date_born}</div> : null}
                </div>

                <div className="form-control">
                <input className="form__input" type="text" name="phone_number" id="phone_number" placeholder="Номер телефона" maxLength={10} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone_number}/>
                {formik.errors.phone_number ? <div className="error">{formik.errors.phone_number}</div> : null}
                </div>
                
                <button type="submit"  className={`form__button ${formik.values.first_name && formik.values.last_name && formik.values.date_born && formik.values.phone_number ? 'form__button--active' : ''}`} disabled={!formik.values.first_name || !formik.values.last_name || !formik.values.date_born  || !formik.values.phone_number}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
        </>
    )
}

export default SignupForm;
