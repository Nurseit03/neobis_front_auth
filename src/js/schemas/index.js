import * as yup from 'yup';

const regName = /^[a-zA-Z]+$/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const validationSchema =  yup.object().shape({
    name: yup.string().matches(regName, {message: "Только буквы"}).required("Обязательное поле"),
    lastName: yup.string().matches(regName, {message: "Только буквы"}).required("Обязательное поле"),
    birthdate: yup.date().required("Обязательное поле"),
    email:  yup.string().matches(regEmail, {message:"Введите корректный адрес эл.почты"}).required("Обязательное поле")
});

export default validationSchema;