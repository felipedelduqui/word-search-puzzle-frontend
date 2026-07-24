import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CategorySection {
  title: string;
  description: string;
  imageUrl: string;
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
      description: 'Explore puzzles inspired by iconic shows, movies, and universe settings.',
      imageUrl: 'https://vofoegntfdlyoqiloqwz.supabase.co/storage/v1/object/sign/puzzle-cards/tv-series-pop-culture.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lZjk1NTAwYS1iMzFlLTQ5YzAtYTBlYy0wMTNhNjUxNjA5NmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwdXp6bGUtY2FyZHMvdHYtc2VyaWVzLXBvcC1jdWx0dXJlLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODQ5MTA5NzcsImV4cCI6NDkzODUxMDk3N30.iKvVFh2DYIYEUxTi3JxNhtfRtDMA7t--8hkLrY6Sv-Y',
      topics: [
        { id: 'harry potter', name: 'Harry Potter' },
        { id: 'game of thrones', name: 'Game of Thrones' },
        { id: 'friends', name: 'Friends' },
        { id: 'how i met your mother', name: 'How I Met Your Mother' }
      ]
    },
    {
      title: 'Science & Education',
      description: 'Test your knowledge across academic subjects, historical events, and global geography.',
      imageUrl: 'https://vofoegntfdlyoqiloqwz.supabase.co/storage/v1/object/sign/puzzle-cards/science-education.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lZjk1NTAwYS1iMzFlLTQ5YzAtYTBlYy0wMTNhNjUxNjA5NmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwdXp6bGUtY2FyZHMvc2NpZW5jZS1lZHVjYXRpb24ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NDkxMTAxOSwiZXhwIjo0OTM4NTExMDE5fQ.9FoGMSKbJliABgPdT6WTgn8HTgUVIRuBL3AlR8SOHtM',
      topics: [
        { id: 'biology', name: 'Biology' },
        { id: 'history', name: 'History' },
        { id: 'scientists', name: 'Scientists' },
        { id: 'countries', name: 'Countries' }
      ]
    },
    {
      title: 'Geeks & Heroes',
      description: 'Dive into legendary comic universes, animation classics, and creature collections.',
      imageUrl: 'https://vofoegntfdlyoqiloqwz.supabase.co/storage/v1/object/sign/puzzle-cards/geek-heroes.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lZjk1NTAwYS1iMzFlLTQ5YzAtYTBlYy0wMTNhNjUxNjA5NmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwdXp6bGUtY2FyZHMvZ2Vlay1oZXJvZXMucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NDkxMDg4OSwiZXhwIjo0OTM4NTEwODg5fQ.-oMiWFon3oVemFomg7zOZ40IuDMYOZXfGSLgJoW2_VA',
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