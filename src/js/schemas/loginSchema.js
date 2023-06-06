import * as yup from 'yup';

const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const loginSchema =  yup.object().shape({
    email:  yup.string().matches(regEmail, {message:"Введите корректный адрес эл.почты"}).required("Неверный логин или пароль"),
    password: yup.string().required("Неверный логин или пароль")
});

export default loginSchema;