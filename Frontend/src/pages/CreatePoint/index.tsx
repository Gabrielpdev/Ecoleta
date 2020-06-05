/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, useState, ChangeEvent, FormEvent,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiLogOut } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import axios from 'axios';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import { Container, Concluido, Mapa } from './styles';

import logo from '../../assets/logo.svg';

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
  const [itens, setItens] = useState<Item[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCitys] = useState<string[]>([]);

  const [selectedUf, setselectedUf] = useState('0');
  const [selectedCity, setselectedCity] = useState('0');
  const [selectedItens, setSelectedItens] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const [messageFinish, setMessageFinish] = useState(true);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setPosition([latitude, longitude]);
    });
  }, []);

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

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

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

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = position;
    const itens = selectedItens;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('itens', itens.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    await api.post('points', data);

    setMessageFinish(false);

    setTimeout(() => history.push('/'), 3000);
  }


  return (
    <Container>
      <header>
        <img src={logo} alt="ecoleta" />

        <button type="button" onClick={() => history.push('/dashboard')}>
          Voltar para a Home
          <FiLogOut color="#2FB86E" size={30} />
        </button>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do
          {' '}
          <br />
          {' '}
          ponto de coleta
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

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
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email da entidade</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp da entidade</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp  "
                onChange={handleInputChange}
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
            <Mapa center={position} zoom={15} onclick={handleMapClick} visible={messageFinish}>
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

      <Concluido visible={!messageFinish}>
        <IoMdCheckmarkCircleOutline color="#2FB86E" size={60} />
        Cadastro Concluido!
      </Concluido>
    </Container>
  );
};

export default CreatePoint;
