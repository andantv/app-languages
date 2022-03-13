import http from "../http-common";

class UserDataService {
  
  verify(){
    console.log("entra al verify");
    return http.get(`index.php`);
  }

  login(username, pass) {
    console.log("entra al login.. Password:"+pass +" username: "+username);
    return http.post(`responses/LoginResponse.php?user=${username}&pass=${pass}`);
  }

  getAll(userId) {
    return http.get(`responses/ProjetResponse.php?value=${userId}`);
  }

  create(data) {
      console.log("entra al request");
            //id=&nom=sin valor&descrip=descript&langueId=1&userId=1
    return http.post(`responses/RegisterResponse.php?id=&nom=${data["nom"]}&prenom=${data["prenom"]}&email=${data["email"]}&nomUtilisateur=${data["nomUtilisateur"]}&motDePasse=${data["motDePasse"]}`);
  }

  delete(id) {
    return http.delete(`/game/${id}`);
  }
}

export default new UserDataService();