/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash } from 'react-icons/fi';

import Header from '../../components/Header';
import { Container, Content } from './styles';

import api from '../../services/api';
import history from '../../services/history';

import { store } from '../../store';

interface Point {
  id: number;
  image:string;
  name:string;
  email:string;
  whatsapp:string;
  city:string;
  uf:string;
}

interface Points {
  image_url:string;
  point: Point,
  itens:{
    title:string
  }[]
}

const Dashboard = () => {
  const [points, setPoints] = useState<Points[]>([]);

  const { token } = store.getState().auth;
  const { profile } = store.getState().user;

  useEffect(() => {
    async function setToken() {
      await (api.defaults.headers.Authorization = `Bearer ${token} `);
    }

    setToken();
  }, [token]);

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get('points');
      setPoints(response.data);
    }
    loadPoints();
  }, []);

  async function handleDeletePoint(ponto: Point) {
    const confirmDelete = window.confirm(
      'Deseja deletar esse ponto ? ',
    );

    if (!confirmDelete) {
      return;
    }


    try {
      await api.delete(`points/${ponto.id}`);
      toast.success('Ponto deletado com sucesso.');
      setPoints(points.filter(({ point }) => point.id !== ponto.id));
    } catch (err) {
      toast.error('Erro ao deletar o ponto.');
    }
  }

  function handleNavigateToPointer(id: number) {
    history.push(`create-point/${id}`);
  }


  return (
    <Container>
      <Header profile={profile} />

      <button type="button" className="add" onClick={() => history.push('/create-point')}>
        <FiPlus color="#fff" size={30} />
        Cadastrar
      </button>

      {points.map((point) => (
        <Content key={point.point.id}>
          <div className="clicker" onClick={() => handleNavigateToPointer(point.point.id)}>
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
          </div>

          <div className="delete">
            <div className="circle" onClick={() => handleDeletePoint(point.point)}>
              <FiTrash size={20} color="#ED0000" />
            </div>
          </div>
        </Content>
      ))}
    </Container>
  );
};

export default Dashboard;
