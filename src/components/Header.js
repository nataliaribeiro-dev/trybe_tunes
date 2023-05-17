import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    savedUserName: '',
    isLoading: true,
  };

  componentDidMount() {
    this.getUserNameSaved();
  }

  getUserNameSaved = async () => {
    const userData = await getUser();
    this.setState({
      savedUserName: userData.name,
      isLoading: false,
    });
  };

  render() {
    const { savedUserName, isLoading } = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }
    return (

      <header data-testid="header-component">
        <p data-testid="header-user-name">{savedUserName}</p>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <br />
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>

    );
  }
}

export default Header;
