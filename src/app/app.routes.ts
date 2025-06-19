import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },  {
    path: 'pokemon-list',
    loadComponent: () => import('./pages/pokemon-list/pokemon-list.page').then( m => m.PokemonListPage)
  },

];
