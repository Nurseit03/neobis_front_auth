import * as yup from 'yup';

const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const basicSchema =  yup.object().shape({
    name: yup.string().matches(regName, {message: "Только буквы"}).required("Required"),
    lastName: yup.string().matches(regName, {message: "Только буквы"}).required("Required"),
    date: yup.number().positive().integer().required("Required"),
    email:  yup.string().matches(regEmail, {message:"Введите корректный адрес эл.почты"}).required("Required")
})

export default basicSchema;