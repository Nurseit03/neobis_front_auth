import React from 'react'
import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import {useFormik} from 'formik';
import signupPassword from '../schemas/signupPassword.js'
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
    password: '',
    confirmPassword: ''
};

const NewPassword = () => {
    const navigate = useNavigate();
        
    const onSubmit = (values,errors) => {
        // if (Object.keys(errors).length === 0) {
            console.log('Form data:', values);
            navigate("/");
        // }
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    const isPasswordValid = formik.touched.password && !formik.errors.password && formik.values.password && /[A-Z]/.test(formik.values.password);
    const isDigitPresent = formik.touched.password && !formik.errors.password && formik.values.password.match(/^(?=.*\d)/);
    const isSpecialCharPresent = formik.touched.password && !formik.errors.password && formik.values.password.match(/^(?=.*[!@#$%^&*()])/);
    const isPasswordConfirmed = formik.touched.confirmPassword && !formik.errors.confirmPassword && formik.values.confirmPassword && formik.values.password === formik.values.confirmPassword;

    return (
        <>
        <div className="form">
            <button className="return__button"><Link to="/PasswordReset"><img src={vector_left} alt="return"/></Link></button>
            <img src={smile} alt="Smile" id="smile__img"/>
            <h2 className="form__title">Новый пароль</h2>
            <form onSubmit={formik.handleSubmit}>
                <input className="form__input" type="text" name="password" id="password" placeholder="Пароль" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                <input className="form__input" type="password" name="confirmPassword" id="confirmPassword" placeholder="Потвердите пароль" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword}/>
                <ul className="conditions">
                <li className={isPasswordValid ? 'valid' : 'invalid'}>Заглавная буква</li>
                <li className={isDigitPresent ? 'valid' : 'invalid'}>Цифры</li>
                <li className={isSpecialCharPresent ? 'valid' : 'invalid'}>Специальные символы</li>
                <li className={isPasswordConfirmed ? 'valid' : 'invalid'}>Совпадение пароля</li>
                </ul>
                <button type="submit"  className={`form__button ${formik.values.password && formik.values.confirmPassword ? 'form__button--active' : ''}`} disabled={!formik.values.password || !formik.values.confirmPassword}>Сбросить</button>
            </form>
        </div>
        </>
    )
}

export default NewPassword;





























// import React from 'react'
// import smile from '../../img/smile.png';
// import vector_left from '../../img/vector_left.png';
// import {useFormik} from 'formik';
// import signupPassword from '../schemas/signupPassword.js'
// import { Link, useNavigate } from 'react-router-dom';

// const initialValues = {
//     password: '',
//     confirmPassword: ''
// };

// const NewPassword = () => {
//     const navigate = useNavigate();
        
//     const onSubmit = (values,errors) => {
//         if (formik.errors.password || formik.errors.confirmPassword) {
//             return;
//           }
//           console.log('Form data:', values);
//           navigate("/");          
//     };

//     const formik = useFormik({
//         initialValues,
//         onSubmit,
//         validationSchema: signupPassword
//     });

//     return (
//         <>
//         <div className="form">
//             <button className="return__button"><Link to="/PasswordReset"><img src={vector_left} alt="return"/></Link></button>
//             <img src={smile} alt="Smile" id="smile__img"/>
//             <h2 className="form__title">Новый пароль</h2>
//             <form onSubmit={formik.handleSubmit}>
//                 <input className="form__input" type="text" name="password" id="password" placeholder="Пароль" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
//                 <input className="form__input" type="password" name="confirmPassword" id="confirmPassword" placeholder="Потвердите пароль" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword}/>
//                 <ul className="conditions">
//                     <li className={!formik.errors.capitalLetters && formik.values.password ? 'valid' : 'invalid'}>Заглавная буква</li>
//                     <li className={!formik.errors.numbers && formik.values.password ? 'valid' : 'invalid'}>Цифры</li>
//                     <li className={!formik.errors.specialSymbols && formik.values.password ? 'valid' : 'invalid'}>Специальные символы</li>
//                     <li className={!formik.errors.confirmPassword ? 'valid' : 'invalid'}>Совпадение пароля</li>
//                 </ul>
//                 <button type="submit"  className={`form__button ${formik.values.password && formik.values.confirmPassword ? 'form__button--active' : ''}`} disabled={!formik.values.password || !formik.values.confirmPassword}>Сбросить</button>
//             </form>
//         </div>
//         </>
//     )
// }

// export default NewPassword;
