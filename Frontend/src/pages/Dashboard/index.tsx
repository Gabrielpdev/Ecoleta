/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';
import logo from '../../assets/logo.svg';

import { signOut } from '../../store/modules/auth/actions';

import api from '../../services/api';
import history from '../../services/history';

import { store } from '../../store';


interface Point {
  point: {
    id: number;
    image:string;
    name:string;
    email:string;
    whatsapp:string;
    city:string;
    uf:string;
  },
  itens:{
    title:string
  }[]
}

const Home = () => {
  const dispatch = useDispatch();

  const [points, setPoints] = useState<Point[]>([]);

  const { profile } = store.getState().user;

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get('points');
      setPoints(response.data);
    }

    loadPoints();
  }, []);

  function handleLogOut() {
    dispatch(signOut());
  }

  function handleNavigateToPointer(id: number) {
    history.push(`create-pointer/${id}`);
  }

  return (
    <Container>
      <header>
        <img src={logo} alt="ecoleta" />
        <div className="profile">
          <strong>{profile.name}</strong>
          <Link to="/profile">Meu Perfil</Link>
        </div>
        <button className="logout" type="button" onClick={handleLogOut}>
          Sair
          <FiLogOut color="#2FB86E" size={30} />
        </button>
      </header>

      <button type="button" className="add" onClick={() => history.push('/create-point')}>
        <FiPlus color="#fff" size={30} />
        Cadastrar
      </button>

      {points.map((point) => (
        <Content key={point.point.id} onClick={() => handleNavigateToPointer(point.point.id)}>
          <div className="image">
            <img src={point.point.image} alt="" />
          </div>

          <div className="description">
            <strong>{point.point.name}</strong>
            <text>
              {point.point.city}
              {' '}
              -
              {' '}
              {point.point.uf}
            </text>
            <span>
              Email:
              {' '}
              {point.point.email}
            </span>
            <span>
              Whatsapp:
              {' '}
              {point.point.whatsapp}
            </span>
          </div>

          <div className="itens">
            {point.itens.map((item) => (
              <li>{item.title}</li>
            ))}
          </div>
        </Content>
      ))}

    </Container>
  );
};

export default Home;
