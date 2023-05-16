import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    isLoading: true,
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

  handleCreateUser = () => {
    const { userName } = this.state;
    createUser({ name: userName });
  };

  render() {
    const { userName, isLoading } = this.state;
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
            onClick={ this.handleCreateUser }
            disabled={ !this.buttonDisabled() }
          >
            Entrar

          </button>
        </div>
      </div>

    );
  }
}

export default Login;
