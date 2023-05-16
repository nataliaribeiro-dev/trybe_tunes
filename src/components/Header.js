import React from 'react';
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
      </header>

    );
  }
}

export default Header;
