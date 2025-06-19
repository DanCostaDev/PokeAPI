import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PokemonListPage implements OnInit {

  pokemons: any[] = [];
  limit: number = 20;
  offset: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe(response => {
      this.pokemons = response.results;
    });
  }

  getPokemonId(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }
}
