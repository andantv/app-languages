import http from "../http-common";

class LeconDataService {
  getAll(unitId) {
    return http.get(`responses/LeconResponse.php?value=${unitId}`);
  } 

  getAllLecons() {
    return http.get(`responses/LeconResponse.php`);
  } 


  create(data) {
      console.log(data);
            //id&num=1&nom=leconuno&breveDescrip=breve&longueDescrip=longue&uniteId=2&sujetId=1&audioVisuelId=1
    return http.post(`responses/LeconResponse.php?id=&num=${data["num"]}&nom=${data["nom"]}&breveDescrip=${data["breveDescrip"]}&longueDescrip=${data["longueDescrip"]}&uniteId=${data["uniteId"]}&sujetId=${data["sujetId"]}&audioVisuelId=${data["audioVisuelId"]}`);
  }

  delete(id) {
    return http.delete(`/game/${id}`);
  }
}

export default new LeconDataService();