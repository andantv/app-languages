import http from "../http-common";

class ActiviteDataService {
  getAll(leconId) {
    return http.get(`responses/ActiviteResponse.php?value=${leconId}`);
  } 
  getAllActivities() {
    return http.get(`responses/ActiviteResponse.php`);
  } 

  create(data) {
      console.log(data);
            //id&num=1&nom=actividad&descrip=descrip&instructions=instrucciones&grammaire=gramatica&leconId=2&typeActiviteId=1
    return http.post(`responses/ActiviteResponse.php?id=&num=${data["num"]}&nom=${data["nom"]}&descrip=${data["descrip"]}&instructions=${data["instructions"]}&grammaire=${data["grammaire"]}&leconId=${data["leconId"]}&typeActiviteId=${data["typeActiviteId"]}`);
  }

  delete(id) {
    return http.delete(`/game/${id}`);
  }
}

export default new ActiviteDataService();