/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, useState, ChangeEvent, FormEvent,
} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Header from '../../components/Header';

import { store } from '../../store';
import api from '../../services/api';
import history from '../../services/history';


import { Container, Content } from './styles';

const AddUser: React.FC = () => {
  const { profile } = store.getState().user;

  const [selectedPermition, setSelectedPermition] = useState<number>(0);

  const { token } = store.getState().auth;

  useEffect(() => {
    async function setToken() {
      await (api.defaults.headers.Authorization = `Bearer ${token} `);
    }

    setToken();
  }, [token]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    let permition = false;
    if (selectedPermition === 0) {
      permition = false;
    } else {
      permition = true;
    }

    try {
      await api.post('users', { ...formData, is_admin: permition });

      history.push('/users');
      toast.success('Usuário cadastrado com sucesso');
    } catch (err) {
      toast.error('Erro ao cadastrar usuário, verifique seus dados');
    }
  }

  function handleSelectedPermition(event: ChangeEvent<HTMLSelectElement>) {
    const permition = event.target.value;
    setSelectedPermition(Number(permition));
  }


  return (
    <Container>
      <Header profile={profile} />

      <Content onSubmit={handleSubmit}>
        <button type="button" className="back" onClick={() => history.push('/dashboard')}>
          <FiArrowLeft color="#2FB86E" size={25} />
          Voltar para a Home
        </button>

        <div className="header">
          <h1>
            Adicionar do usuário
          </h1>

          <select
            name="permition"
            id="permition"
            onChange={handleSelectedPermition}
            value={selectedPermition}
          >
            <option value={0}>Moderador</option>
            <option value={1}>Administrador</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="name">Nome do usuário</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email do usuário</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Senha do usuário</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirmação da senha</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleInputChange}
          />
        </div>

        <hr />

        <button type="submit">
          Cadastar Perfil
        </button>

      </Content>
    </Container>
  );
};

export default AddUser;
