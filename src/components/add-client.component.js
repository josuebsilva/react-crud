import React, { Component } from "react";
import ClientDataService from "../services/client.service";
import { Routes, Route, Link } from "react-router-dom";

export default class AddClient extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCordX = this.onChangeCordX.bind(this);
    this.onChangeCordY = this.onChangeCordY.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.saveClient = this.saveClient.bind(this);
    this.newClient = this.newClient.bind(this);

    this.state = {
      id: null,
      name: "",
      email: "", 
      phone_number: "",
      cord_x: "",
      cord_y: "",
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeCordX(e) {
    this.setState({
      cord_x: e.target.value
    });
  }

  onChangeCordY(e) {
    this.setState({
      cord_y: e.target.value
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phone_number: e.target.value
    });
  }

  saveClient() {
    var data = {
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      cord_x: this.state.cord_x,
      cord_y: this.state.cord_y
    };

    ClientDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          cord_x: response.data.cord_x,
          cord_y: response.data.cord_y,
          phone_number: response.data.phone_number,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newClient() {
    this.setState({
      id: null,
      name: "",
      email: "",
      phone_number: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Cadastrado com sucesso!</h4>
            <hr></hr>
            <button className="btn btn-success" onClick={this.newClient}>
              Cadastrar novo
            </button>
            <Link to={"/clients"} className="nav-link">
              Voltar
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="phone_number"
                required
                value={this.state.phone_number}
                onChange={this.onChangePhoneNumber}
                name="phone_number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cord_x">Cordenada X</label>
              <input
                type="text"
                className="form-control"
                id="cord_x"
                required
                value={this.state.cord_x}
                onChange={this.onChangeCordX}
                name="cord_x"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cord_y">Cordenada Y</label>
              <input
                type="text"
                className="form-control"
                id="cord_y"
                required
                value={this.state.cord_y}
                onChange={this.onChangeCordY}
                name="cord_y"
              />
            </div>

            <button onClick={this.saveClient} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}
