/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

import Header from '../../components/Header';
import { Container, Content } from './styles';

import api from '../../services/api';
import history from '../../services/history';

import { store } from '../../store';

interface Users {
  id: number,
  name:string,
  email: string,
  is_admin: boolean,
}

const Users = () => {
  const [users, setUsers] = useState<Users[]>([]);

  const { profile } = store.getState().user;

  const { token } = store.getState().auth;

  useEffect(() => {
    async function setToken() {
      await (api.defaults.headers.Authorization = `Bearer ${token} `);
    }

    setToken();
  }, [token]);


  useEffect(() => {
    async function loadPoints() {
      const response = await api.get('users');
      setUsers(response.data);
    }

    loadPoints();
  }, []);

  function handleUser(id: number) {
    history.push(`/profile/${id}`);
  }


  return (
    <Container>
      <Header profile={profile} />

      <button type="button" className="add" onClick={() => history.push('/add-user')}>
        <FiPlus color="#fff" size={30} />
        Cadastrar
      </button>

      {users.map((user) => (
        <Content key={user.id} onClick={() => handleUser(user.id)}>
          <div className="description">
            <strong>{user.name}</strong>
            <span>
              Email:
              {' '}
              {user.email}
            </span>
          </div>
          <div className="permition">
            <strong>{user.is_admin ? 'Administrador' : 'Moderador'}</strong>
          </div>
        </Content>
      ))}

    </Container>
  );
};

export default Users;
