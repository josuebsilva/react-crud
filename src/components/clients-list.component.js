import React, { Component } from "react";
import ClientDataService from "../services/client.service";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default class ClientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.retrieveClients = this.retrieveClients.bind(this);
    this.retrieveRoutes = this.retrieveRoutes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClient = this.setActiveClient.bind(this);
    this.removeAllClients = this.removeAllClients.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      clients: [],
      clientsRoute: [],
      currentClient: null,
      currentIndex: -1,
      showModal: false,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveClients();
    this.retrieveRoutes();
  }

  onShowModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveClients() {
    ClientDataService.getAll()
      .then(response => {
        this.setState({
          clients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveRoutes() {
    ClientDataService.getRoutes()
      .then(response => {
        this.setState({
          clientsRoute: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveClients();
    this.retrieveRoutes();
    this.setState({
      currentClient: null,
      currentIndex: -1
    });
  }

  setActiveClient(client, index) {
    this.setState({
      currentClient: client,
      currentIndex: index
    });
  }

  removeAllClients() {
    ClientDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentClient: null,
      currentIndex: -1
    });

    ClientDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          clients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, clients, currentClient, currentIndex, clientsRoute } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar pelo nome"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-10 mb-10">
          <h4>Lista de clientes</h4>

          <ul className="list-group">
            {clients &&
              clients.map((client, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveClient(client, index)}
                  key={index}
                >
                  {client.name}
                </li>
              ))}
          </ul>
          {clients.length == 0 &&
            <div className="alert alert-info">Nenhum cliente Cadastrado</div>
          }
          <hr></hr>
          {clients.length == 0 &&
            <Link to={"/add"} className="btn btn-sm btn-info">
              Cadastrar Novo
            </Link>
          }
          {clients.length > 0 &&
            <div>
              <button
                className="btn btn-sm btn-danger"
                onClick={this.removeAllClients}
              >
                Remover Todos
              </button>
              <button
                className="btn btn-sm btn-info ml-10"
                onClick={this.onShowModal}
              >
                Calcular rota
              </button>
            </div>
          }
        </div>
        <div className="col-md-6">
          {currentClient ? (
            <div>
              <h4>Cliente</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentClient.name}
              </div>
              <div>
                <label>
                  <strong>Telefone:</strong>
                </label>{" "}
                {currentClient.phone_number}
              </div>
              <div>
                <label>
                  <strong>Cordenada X:</strong>
                </label>{" "}
                {currentClient.cord_x}
              </div>
              <div>
                <label>
                  <strong>Cordenada Y:</strong>
                </label>{" "}
                {currentClient.cord_y}
              </div>

              <Link
                to={"/clients/" + currentClient.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
            </div>
          )}
        </div>
        <Modal show={this.state.showModal} onHide={this.onShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Rota de visitas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="list-group">
              {clientsRoute &&
                clientsRoute.map((client, index) => (
                  <li
                    className={
                      "list-group-item "
                    }
                    key={index}
                  >
                    {client.name}
                  </li>
                ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onShowModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
