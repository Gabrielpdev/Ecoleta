/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, useState, ChangeEvent, FormEvent,
} from 'react';
import { toast } from 'react-toastify';
import { useParams, useHistory } from 'react-router-dom';
import { Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiArrowLeft } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

import axios from 'axios';
import api from '../../services/api';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';

import {
  Container, Concluido, Mapa, Erro,
} from './styles';
import { store } from '../../store';


interface Item {
  id: number,
  title: string,
  image_url: string
}

interface IBGEUFResponse{
  sigla: string
}

interface IBGECityResponse{
  nome: string
}

const CreatePoint = () => {
  const { profile } = store.getState().user;
  const { token } = store.getState().auth;

  const { id } = useParams();

  const [itens, setItens] = useState<Item[]>([]);

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [whatsapp, setWhatsapp] = useState<string>();

  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCitys] = useState<string[]>([]);

  const [selectedUf, setselectedUf] = useState('0');
  const [selectedCity, setselectedCity] = useState('0');
  const [selectedItens, setSelectedItens] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<string>();

  const [messageOK, setMessageOK] = useState(true);
  const [messageError, setMessageError] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function setToken() {
      await (api.defaults.headers.Authorization = `Bearer ${token} `);
    }

    setToken();
  }, [token]);

  useEffect(() => {
    if (!id) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setPosition([latitude, longitude]);
      });
    }
  }, [id]);

  useEffect(() => {
    api.get('itens').then((response) => {
      setItens(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then((response) => {
        const cityName = response.data.map((city) => city.nome);

        setCitys(cityName);
      });
  }, [selectedUf]);

  useEffect(() => {
    async function loadPoint() {
      const { data } = await api.get(`/points/${id}`);
      setSelectedImage(data.point.image_url);
      setName(data.point.name);
      setEmail(data.point.email);
      setWhatsapp(data.point.whatsapp);
      setPosition([data.point.latitude, data.point.longitude]);
      setselectedUf(data.point.uf);
      setselectedCity(data.point.city);

      const itensID: number[] = [];
      data.itens.map((item: Item) => {
        itensID.push(item.id);
      });
      setSelectedItens(itensID);
    }
    loadPoint();
  }, [id, selectedFile]);

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setselectedUf(uf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setselectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setPosition([
      event.latlng.lat,
      event.latlng.lng,
    ]);
  }

  console.log(position)

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItens.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItens = selectedItens.filter((item) => item !== id);

      setSelectedItens(filteredItens);
    } else {
      setSelectedItens([...selectedItens, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();


    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = position;
    const itens = selectedItens;

    const data = new FormData();

    data.append('name', String(name));
    data.append('email', String(email));
    data.append('whatsapp', String(whatsapp));
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('itens', itens.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    } else {
      toast.error('Imagem não selecionada, selecione o arquivo.');
    }

    try {
      if (id) {
        await api.put(`points/${id}`, data);
      } else {
        await api.post('points', data);
      }

      setMessageOK(false);
      setTimeout(() => history.push('/dashboard'), 3000);
    } catch (err) {
      setMessageError(false);
      setTimeout(() => setMessageError(true), 3000);
    }
  }

  return (
    <Container>
      <Header profile={profile} />

      <form onSubmit={handleSubmit}>
        <button type="button" className="back" onClick={() => history.push('/dashboard')}>
          <FiArrowLeft color="#2FB86E" size={25} />
          Voltar
        </button>
        <h1>
          {id ? 'Atualizando ponto de coleta' : 'Cadastro do ponto de coleta'}
        </h1>

        <Dropzone
          onFileUploaded={setSelectedFile}
          defaultFile={id ? String(selectedImage) : undefined}
        />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email da entidade</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp da entidade</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <div className="mapa">
            <Mapa
              center={position}
              zoom={15}
              onclick={handleMapClick}
              visible={messageOK || messageError}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker position={position} />
            </Mapa>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                onChange={handleSelectedUf}
                value={selectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                onChange={handleSelectedCity}
                value={selectedCity}
              >
                <option value="0">Selecione uma cidade</option>
                {citys.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione uma ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {
              itens.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItens.includes(item.id) ? 'selected' : ''}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              ))
            }
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>

      <Concluido visible={!messageOK}>
        <IoMdCheckmarkCircleOutline color="#2FB86E" size={60} />
        Cadastro Concluido!
      </Concluido>
      <Erro visible={!messageError}>
        <IoMdRemoveCircleOutline color="#990000" size={60} />
        Erro no Cadastro! Verifique seus dados.
      </Erro>
    </Container>
  );
};

export default CreatePoint;
