import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private BASE_URL = "http://localhost:8081/api/"

  constructor(private http: HttpClient) { }

  getRandomGame(): Observable<any> {
    return this.http.get(`${this.BASE_URL}game/random`);
  }
}
