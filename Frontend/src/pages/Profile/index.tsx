/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, useState, ChangeEvent, FormEvent,
} from 'react';
import { useDispatch } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../../components/Header';

import { store } from '../../store';
import api from '../../services/api';
import history from '../../services/history';

import { updateProfileRequest } from '../../store/modules/user/actions';

import { Container, Content } from './styles';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = store.getState().auth;
  const { profile } = store.getState().user;

  const [selectedPermition, setSelectedPermition] = useState<number>(0);
  const [userName, setUserName] = useState<string>(id ? undefined : profile.name);
  const [email, setEmail] = useState<string>(id ? undefined : profile.email);

  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
    is_admin: profile.is_admin,
  });

  useEffect(() => {
    async function setToken() {
      await (api.defaults.headers.Authorization = `Bearer ${token} `);
    }

    setToken();
  }, [token]);

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`users/${id}`);
      setUserName(response.data.name);
      setEmail(response.data.email);
    }

    loadUser();
  }, [id]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function handleSubmit(event: FormEvent) {
    if (id) {
      event.preventDefault();
      let permition = false;

      if (selectedPermition === 0) {
        permition = false;
      } else {
        permition = true;
      }

      console.tron.log(permition);

      if (Number(id) === profile.id) {
        const confirmDelete = window.confirm(
          'Deseja alterar seu cargo ? ',
        );

        if (!confirmDelete) {
          return;
        }

        dispatch(updateProfileRequest({
          ...formData, name: userName, email, is_admin: permition,
        }));


        history.push('/users');
        toast.success('Usuário atualizado com sucesso');
      } else {
        try {
          await api.put(`users/${id}`, {
            name: userName,
            email,
            is_admin: permition,
          });

          history.push('/users');
          toast.success('Usuário atualizado com sucesso');
        } catch (err) {
          toast.error('Erro ao cadastrar usuário, verifique seus dados');
        }
      }
    } else {
      event.preventDefault();

      dispatch(updateProfileRequest({ name: userName, email, ...formData }));
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
        <button type="button" className="back" onClick={() => history.push('/users')}>
          <FiArrowLeft color="#2FB86E" size={25} />
          Voltar
        </button>

        <div className="header">
          <h1>
            Perfil do usuário
          </h1>

          { id ? (
            <select
              name="permition"
              id="permition"
              onChange={handleSelectedPermition}
              value={selectedPermition}
            >
              <option value={0}>Moderador</option>
              <option value={1}>Administrador</option>
            </select>
          ) : <></>}
        </div>

        <div className="field">
          <label htmlFor="name">Nome do usuário</label>
          <input
            type="text"
            name="name"
            id="name"
            readOnly={!!id}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email do usuário</label>
          <input
            type="email"
            name="email"
            id="email"
            readOnly={!!id}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <hr />

        { id ? <> </> : (
          <>
            <div className="field">
              <label htmlFor="oldPassword">Senha atual</label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="password">Nova senha</label>
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
          </>
        )}

        <button type="submit">
          Atualizar Perfil
        </button>

      </Content>

    </Container>
  );
};

export default Profile;
