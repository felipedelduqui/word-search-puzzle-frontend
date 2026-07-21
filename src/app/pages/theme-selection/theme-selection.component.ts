import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicItem } from '../../core/models/puzzle.model';

@Component({
  selector: 'app-theme-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-selection.component.html',
  styleUrl: './theme-selection.component.scss',
})
export class ThemeSelectionComponent {
  readonly topics = input.required<TopicItem[]>();
  readonly selectedTopic = input.required<string>();
  readonly topicSelected = output<string>();

  protected selectTopic(topicId: string): void {
    this.topicSelected.emit(topicId);
  }
}