import http from "../http-common";

class VocabulaireDataService {
  getAll(activiteId) {
    return http.get(`responses/VocabulaireResponse.php?value=${activiteId}`);
  } 

  create(data) {
      console.log(data);
            //https://localhost/api/responses/VocabulaireResponse.php?id&mot=casa&traduction=maison&audio=audio&image=image&activiteId=25
    return http.post(`responses/VocabulaireResponse.php?id=&mot=${data["mot"]}&traduction=${data["traduction"]}&audio=${data["audio"]}&image=${data["image"]}&activiteId=${data["activiteId"]}`);
  }

  delete(id) {
    return http.delete(`responses/VocabulaireResponse.php?value=${id}`);
  }

  update(data) {
    //https://localhost/api/responses/VocabulaireResponse.php?value=5&mot=perro&traduction=chien&audio=audio&image=image&activiteId=26
    return http.delete(`responses/VocabulaireResponse.php?value=${data["id"]}&mot=${data["mot"]}&traduction=${data["traduction"]}&audio=${data["audio"]}&image=${data["image"]}&activiteId=${data["activiteId"]}`);
  }
}

export default new VocabulaireDataService();