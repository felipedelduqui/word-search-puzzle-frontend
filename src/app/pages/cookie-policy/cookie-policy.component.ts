import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [],
  templateUrl: './cookie-policy.html',
  styleUrls: ['./cookie-policy.scss']
})
export class CookiePolicyComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}