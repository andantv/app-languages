import http from "../http-common";

class UnitDataService {
  getAll(projetId) {
    return http.get(`responses/UniteResponse.php?value=${projetId}`);
  } 

  create(data) {
      console.log(data);
            //id&num=1&nom=simon&descrip=asd&publicId=1&niveauId=1&projetId=2
    return http.post(`responses/UniteResponse.php?id=&num=${data["num"]}&nom=${data["nom"]}&descrip=${data["descrip"]}&publicId=${data["publicId"]}&niveauId=${data["niveauId"]}&projetId=${data["projetId"]}`);
  }

  delete(id) {
    return http.delete(`/game/${id}`);
  }
}

export default new UnitDataService();