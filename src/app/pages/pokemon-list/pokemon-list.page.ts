import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  animations: [
    trigger('cardListAnimation', [
      transition(':enter', [
        query(
          '.pokemon-card',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '400ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class PokemonListPage implements OnInit {
  @ViewChild('contentRef', { static: false }) content!: IonContent;
  pokemons: any[] = [];
  limit: number = 24;
  offset: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
  this.pokemonService.getPokemonList(this.limit, this.offset).subscribe(async response => {
    const results = response.results;

    this.pokemons = await Promise.all(
      results.map(async (pokemon: any) => {
        const details = await this.pokemonService.getPokemonDetails(pokemon.name).toPromise();
        return {
          ...pokemon,
          types: details.types.map((t: any) => t.type.name)
        };
      })
    );
    setTimeout(() => {
    this.content?.scrollToTop(300);
    }, 0);
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

  onPokemonSelected(pokemon: any) {
    console.log('Selecionado:', pokemon.name);
  }

  getCardGradient(pokemon: any): string {
    const types = pokemon.types;
    if (!types || types.length === 0) return 'background: #ccc;';

    const color1 = this.getTypeColor(types[0]);
    const color2 = types[1] ? this.getTypeColor(types[1]) : color1;

    return `background: linear-gradient(135deg, ${color1}, ${color2});`;
  }

  getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    fire: '#f08030',
    water: '#6890f0',
    grass: '#78c850',
    electric: '#f8d030',
    psychic: '#f85888',
    ice: '#98d8d8',
    ground: '#e0c068',
    rock: '#b8a038',
    ghost: '#705898',
    dark: '#705848',
    steel: '#b8b8d0',
    fairy: '#ee99ac',
    dragon: '#7038f8',
    bug: '#a8b820',
    fighting: '#c03028',
    poison: '#a040a0',
    normal: '#a8a878',
    flying: '#a890f0'
  };

    return typeColors[type] || '#ccc';
  }
}
