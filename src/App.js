import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddClient from "./components/add-client.component";
import Client from "./components/client.component";
import ClientsList from "./components/clients-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Teste</a>
          <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
            </li>
          </ul>
        </nav>
        
        <div class="container-fluid">
          <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <Link to={"/clients"} className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      Clientes
                    </Link>
                  </li>
                  
                </ul>
              </div>
            </nav>

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">Clientes</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                  <Link to={"/add"} className="btn btn-sm btn-outline-secondary">
                    Cadastrar Novo
                  </Link>
                </div>
              </div>
              <Routes>
                <Route path="/" element={<ClientsList/>} />
                <Route path="/clients" element={<ClientsList/>} />
                <Route path="/add" element={<AddClient/>} />
                <Route path="/clients/:id" element={<Client/>} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
