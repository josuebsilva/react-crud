import React, { Component } from "react";
import ClientDataService from "../services/client.service";
import { withRouter } from '../common/with-router';
import { Routes, Route, Link } from "react-router-dom";

class Client extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCordX = this.onChangeCordX.bind(this);
    this.onChangeCordY = this.onChangeCordY.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentClient: {
        id: null,
        name: "",
        email: "",
        cord_x: "",
        cord_y: "",
        phone_number: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getClient(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          name: name
        }
      };
    });
  }

  onChangePhoneNumber(e) {
    const phone_number = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          phone_number: phone_number
        }
      };
    });
  }

  onChangeCordX(e) {
    const cord_x = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          cord_x: cord_x
        }
      };
    });
  }

  onChangeCordY(e) {
    const cord_y = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          cord_y: cord_y
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        email: email
      }
    }));
  }

  getClient(id) {
    ClientDataService.get(id)
      .then(response => {
        this.setState({
          currentClient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateClient() {
    ClientDataService.update(
      this.state.currentClient.id,
      this.state.currentClient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Cliente atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteClient() {    
    ClientDataService.delete(this.state.currentClient.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/clients');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentClient } = this.state;

    return (
      <div>
        {currentClient ? (
          <div className="edit-form">
            <h4>Editar</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentClient.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentClient.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_number">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone_number"
                  value={currentClient.phone_number}
                  onChange={this.onChangePhoneNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cord_x">Cordenada X</label>
                <input
                  type="text"
                  className="form-control"
                  id="cord_x"
                  value={currentClient.cord_x}
                  onChange={this.onChangeCordX}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cord_x">Cordenada Y</label>
                <input
                  type="text"
                  className="form-control"
                  id="cord_y"
                  value={currentClient.cord_y}
                  onChange={this.onChangeCordY}
                />
              </div>
              
            </form>
            <hr></hr>
            <button
              className="btn btn-danger"
              onClick={this.deleteClient}
            >
              Remover
            </button>

            <button
              type="submit"
              className="btn btn-success ml-3"
              onClick={this.updateClient}
            >
              Atualizar
            </button>
            <Link to={"/clients"} className="btn btn-default ml-3">
              Voltar
            </Link>
            {this.state.message && 
              <p className="mt-10 alert alert-success">{this.state.message}</p>
            }
          </div>
        ) : (
          <div>
            <br />
            <p>Escolha um cliente...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Client);