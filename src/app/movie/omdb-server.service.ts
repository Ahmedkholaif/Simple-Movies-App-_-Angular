import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OmdbServerService {
  constructor(private httpClient: HttpClient) { }
  getMovie(title: string) {
    return this.httpClient.get(`http://www.omdbapi.com/?t=${encodeURI(title)}&apikey=8d9def44`);
  }
}
