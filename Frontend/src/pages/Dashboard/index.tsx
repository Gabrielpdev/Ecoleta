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

interface Point {
  image_url:string;
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

const Dashboard = () => {
  const [points, setPoints] = useState<Point[]>([]);

  const { profile } = store.getState().user;

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get('points');
      setPoints(response.data);
    }

    loadPoints();
  }, []);

  function handleNavigateToPointer(id: number) {
    history.push(`create-pointer/${id}`);
  }

  return (
    <Container>
      <Header profile={profile} />

      <button type="button" className="add" onClick={() => history.push('/create-point')}>
        <FiPlus color="#fff" size={30} />
        Cadastrar
      </button>

      {points.map((point) => (
        <Content key={point.point.id} onClick={() => handleNavigateToPointer(point.point.id)}>
          <div className="image">
            <img src={point.image_url} alt="" />
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

export default Dashboard;
