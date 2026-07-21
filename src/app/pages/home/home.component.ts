import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CategorySection {
  title: string;
  themeClass: string;
  topics: { id: string; name: string }[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly sections = signal<CategorySection[]>([
    {
      title: 'TV Series & Pop Culture',
      themeClass: 'theme-purple',
      topics: [
        { id: 'harry potter', name: 'Harry Potter' },
        { id: 'game of thrones', name: 'Game of Thrones' },
        { id: 'friends', name: 'Friends' },
        { id: 'how i met your mother', name: 'How I Met Your Mother' }
      ]
    },
    {
      title: 'Science & Education',
      themeClass: 'theme-blue',
      topics: [
        { id: 'biology', name: 'Biology' },
        { id: 'history', name: 'History' },
        { id: 'scientists', name: 'Scientists' },
        { id: 'countries', name: 'Countries' }
      ]
    },
    {
      title: 'Geeks & Heroes',
      themeClass: 'theme-emerald',
      topics: [
        { id: 'marvel', name: 'Marvel' },
        { id: 'dc', name: 'DC' },
        { id: 'pokemon', name: 'Pokémon' },
        { id: 'dragon ball', name: 'Dragon Ball' }
      ]
    }
  ]);

  constructor(private router: Router) {}

  protected selectTopic(topicId: string): void {
    this.router.navigate(['/game'], { queryParams: { topic: topicId } });
  }
}