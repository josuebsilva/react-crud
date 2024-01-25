import http from "../http-common";

class ClientDataService {
  getAll() {
    return http.get("/clients");
  }

  getRoutes() {
    return http.get("/clients/route");
  }

  get(id) {
    return http.get(`/clients/${id}`);
  }

  create(data) {
    return http.post("/clients", data);
  }

  update(id, data) {
    return http.put(`/clients/${id}`, data);
  }

  delete(id) {
    return http.delete(`/clients/${id}`);
  }

  deleteAll() {
    return http.delete(`/clients`);
  }

  findByName(name) {
    return http.get(`/clients?name=${name}`);
  }
}

export default new ClientDataService();