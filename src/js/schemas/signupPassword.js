import * as yup from 'yup';

const signupPassword = yup.object().shape({
  capitalLetters: yup
    .string()
    .matches(/^(?=.*[A-Z])/, 'Заглавная буква должна присутствовать'),
  numbers: yup
    .string()
    .matches(/^(?=.*\d)/, 'Цифра должна присутствовать'),
  specialSymbols: yup
    .string()
    .matches(/^(?=.*[!@#$%^&*()])/, 'Специальный символ должен присутствовать'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
});

export default signupPassword;
