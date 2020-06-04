/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { FiLogIn } from 'react-icons/fi';

import { Container } from './styles';
import logo from '../../assets/logo.svg';

import { signInRequest } from '../../store/modules/auth/actions';

const Home = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    dispatch(signInRequest(formData));
  }

  return (
    <Container>
      <div className="content">
        <header>
          <img src={logo} alt="ecoleta" />
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos as pessoas a encontrarem pontos de coleta de forma eficiente.</p>

          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="field">
                <label htmlFor="email">Email da entidade</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label htmlFor="password">Nome da entidade</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                />
              </div>


            </fieldset>
            <button type="submit">
              <FiLogIn size={20} />
              <strong>Entre com seu login</strong>
            </button>
          </form>
        </main>
      </div>
    </Container>
  );
};

export default Home;
