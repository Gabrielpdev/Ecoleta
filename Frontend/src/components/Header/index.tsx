import React from 'react';
import { useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';
import history from '../../services/history';

import logo from '../../assets/logo.svg';

import { Container } from './styles';

interface Props {
  profile: {
    name: string,
    email: string,
    is_admin: boolean,
  };
}

const Header: React.FC<Props> = ({ profile }) => {
  const dispatch = useDispatch();
  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <img src={logo} alt="ecoleta" onClick={() => history.push('/dashboard')} />
      {profile.is_admin ? (
        <div className="navigation">
          <NavLink to="/dashboard">PONTOS DE COLETA </NavLink>
          <NavLink to="/users">USUARIOS </NavLink>
        </div>
      ) : (<> </>)}
      <div className="profile">
        <strong>{profile.name}</strong>
        <Link to="/profile">Meu Perfil</Link>
      </div>
      <button className="logout" type="button" onClick={handleLogOut}>
        Sair
        <FiLogOut color="#2FB86E" size={30} />
      </button>
    </Container>
  );
};

export default Header;
