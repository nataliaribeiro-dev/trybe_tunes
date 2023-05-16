import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    isLoading: false,
  };

  handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const values = type === 'checkbox' ? checked : value; // se o type do for name, por exemplo o estado vai ser populado com o valor digitado.
    this.setState({
      [name]: values,
    });
  };

  buttonDisabled = () => {
    const { userName } = this.state;

    const characters = 3;
    const nameInput = userName.length >= characters;
    return nameInput;
  };

  handleClick = async () => {
    const { userName } = this.state;
    const { history } = this.props;

    this.setState({ isLoading: true });

    await createUser({ name: userName });

    history.push('/search');
  };

  render() {
    const { userName, isLoading } = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }

    return (
      <div data-testid="page-login">

        <input
          type="text"
          data-testid="login-name-input"
          name="userName"
          value={ userName }
          onChange={ this.handleChange }
          placeholder="Nome"
        />
        <div>
          <button
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ !this.buttonDisabled() }
          >
            Entrar

          </button>
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
