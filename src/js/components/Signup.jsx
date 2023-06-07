import {React, useState, useEffect} from 'react';
import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from '../../api/api.js';

ReactModal.setAppElement('#root');

const Signup = () => {
  const [modalEmail, setModalEmail] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (values, actions) => {
    handleSignup(values);
    actions.resetForm();

    console.log('Form data:', values);
    setModalEmail(values.email);
    openModal();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: {
      email: "" // only gmail for that
      // username: "TESTT",
      // password: "TESTT",
    },
    // validationSchema: signupSchema,
    onSubmit,
  });

  const handleSignup = async (user) => {
    // console.log(user);
    // console.log(JSON.stringify(user));
    try {
      const response = await axios.post("/register/", user);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
    navigate('/SignupForm');
  };

  return (
    <>
      <div className="form">
        <button className="return__button">
          <Link to="/"><img src={vector_left} alt="return" /></Link>
        </button>
        <img src={smile} alt="Smile" id="smile__img" />
        <h2 className="form__title">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form__input"
            method="post"
            type="email"
            name="email"
            id="email"
            placeholder="Электронная почта"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <button
            type="submit"
            className={`form__button ${values.email ? 'form__button--active' : ''}`}
            disabled={!values.email}
          >
            <Link to="/SignupForm">Далее</Link>
          </button>
        </form>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Письмо отправлено"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '565px',
            height: '419px',
            background: '#FFFFFF',
            borderRadius: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '44px 16px',
            gap: '24px',
            border: 'none',
          },
        }}
      >
        <img src={smile} alt="Smile" />
        <h3>На вашу почту «<p className="modal__email">{modalEmail}</p>» было отправлено письмо</h3>
        <button onClick={closeModal} className="form__button--active">Закрыть</button>
      </ReactModal>
    </>
  );
};

export default Signup;
