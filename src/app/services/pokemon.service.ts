import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  
  constructor(private http: HttpClient) { }

  private baseUrl = 'https://pokeapi.co/api/v2';


  getPokemonList(limit = 20, offset = 0): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${name}`);
  }
}
