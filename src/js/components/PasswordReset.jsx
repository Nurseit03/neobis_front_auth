import React, { useState } from 'react';
import smile from '../../img/smile.png';
import vector_left from '../../img/vector_left.png';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from '../../api/axios.js';

ReactModal.setAppElement('#root');

const initialValues = {
  email: ''
};

const PasswordReset = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalEmail, setModalEmail] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        formik.resetForm();
    };

    const onSubmit = async (values, actions) => {
        handleResetEmail(values);
        setModalEmail(values.email);
        actions.resetForm();

        console.log('Form data:', values);
        openModal();
    };

    const handleResetEmail = async (user) => {
        // console.log(user);
        // console.log(JSON.stringify(user));
        try {
          const response = await axios.post("/request-reset-email/",user);
    
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
        onSubmit
    });

    return (
        <>
        <div className="form">
            <button className="return__button">
                <Link to="/"><img src={vector_left} alt="return" /></Link>
            </button>
            <img src={smile} alt="Smile" id="smile__img" />
            <h2 className="form__title">Сброс пароля</h2>
            <p className="form__subtitle">На введенную вами почту мы отправим ссылку, перейдя по которой вы сможете сбросить пароль</p>
            <form onSubmit={formik.handleSubmit}>
            <input className="form__input" type="email" name="email" id="email" placeholder="Электронная почта" onChange={formik.handleChange} value={formik.values.email} />
            <button type="submit" className={`form__button ${formik.values.email ? 'form__button--active' : ''}`} disabled={!formik.values.email}>
                Далее
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
            <img src={smile} alt="" />
            <h3>На вашу почту «<p className="modal__email">{modalEmail}</p>» было отправлено письмо</h3>
            <button onClick={closeModal} className="form__button--active">Закрыть</button>
        </ReactModal>
        </>
    );
};

export default PasswordReset;
