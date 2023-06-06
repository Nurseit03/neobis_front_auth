import * as yup from 'yup';
const signupPassword = yup.object().shape({
    password: yup
      .string()
      .required('Введите пароль')
      .matches(/^(?=.*[A-Z])/, 'Заглавная буква должна присутствовать')
      .matches(/^(?=.*\d)/, 'Цифра должна присутствовать')
      .matches(/^(?=.*[!@#$%^&*()])/, 'Специальный символ должен присутствовать'),
    confirmPassword: yup
      .string()
      .required('Подтвердите пароль')
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
});
export default signupPassword;
