import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getActiveOffset } from '@angular/material/datepicker/multi-year-view';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  api: string = ''
  //https://jsonplaceholder.typicode.com/posts

  getData(): Observable<any>{
    return this.http.get(this.api);
  }
}
