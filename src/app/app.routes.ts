import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  { 
    path: 'game', 
    loadComponent: () => import('./pages/game-board/game-board.component').then(m => m.GameBoardComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) 
  }
];