import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="about-card-container">
      <h2>About the Developer</h2>
      <p>Content regarding professional background in Engineering and Information Systems.</p>
    </div>
  `,
  styles: [`
    .about-card-container { padding: 3rem; text-align: center; color: #f8fafc; }
  `]
})
export class AboutComponent {}