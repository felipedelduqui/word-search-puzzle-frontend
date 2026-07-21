import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'game', 
    loadComponent: () => import('./pages/game-board/game-board.component').then(m => m.GameBoardComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: 'privacy-policy', 
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) 
  },
  { 
    path: 'terms-of-use', 
    loadComponent: () => import('./pages/terms-of-use/terms-of-use.component').then(m => m.TermsOfUseComponent)
  },
  { 
    path: 'cookie-policy', 
    loadComponent: () => import('./pages/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent) 
  },
  { path: '**', redirectTo: '' }
];