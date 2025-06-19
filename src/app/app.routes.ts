import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon-list',
    pathMatch: 'full'
  },
  {
    path: 'pokemon-list',
    loadComponent: () => import('./pages/pokemon-list/pokemon-list.page').then(m => m.PokemonListPage)
  }
];
