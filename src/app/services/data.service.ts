import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

//fetching the data and images from the following api
export class DataService {
  private domain= 'https://dog.ceo/api/breeds/list/all';
  constructor(private httpClient: HttpClient) {}
  getBreeds(): Observable<any>{
    return this.httpClient.get<any>(this.domain);
  }
  getImage(breed_name: string): Observable<any>{
    return this.httpClient.get<any>(`https://dog.ceo/api/breed/${breed_name}/images/random`);
  }
}