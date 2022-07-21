import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postDevice(data : any){
    return this.http.post<any>("http://localhost:8080/api/cartographs/", data);
  }
  getDevice(){
    return this.http.get<any>("http://localhost:8080/api/cartographs/");
  }
  putDevice(data:any, id : number){
    return this.http.put<any>("http://localhost:8080/api/cartographs/"+id, data);
  }
  deleteDevice(id:number){
    return this.http.delete<any>( "http://localhost:8080/api/cartographs/"+id);
  }
  

  
}
