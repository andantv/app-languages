import http from "../http-common";

class ProjetDataService {
  getAll(userId) {
    return http.get(`responses/ProjetResponse.php?value=${userId}`);
  }

  create(data) {
      console.log("entra al request");
            //id=&nom=sin valor&descrip=descript&langueId=1&userId=1
    return http.post(`responses/ProjetResponse.php?id=&nom=${data["nom"]}&descrip=${data["descrip"]}&langueId=${data["langueId"]}&userId=${data["userId"]}`);
  }

  delete(id) {
    return http.delete(`/game/${id}`);
  }
}

export default new ProjetDataService();