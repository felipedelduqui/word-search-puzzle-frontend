import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicItem } from '../../core/models/puzzle.model';

@Component({
  selector: 'app-theme-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-selection.html',
  styleUrl: './theme-selection.scss',
})
export class ThemeSelectionComponent {
  // Inputs vindos do componente pai
  readonly topics = input.required<TopicItem[]>();
  readonly selectedTopic = input.required<string>();

  // Evento emitido para notificar o pai quando um tópico for selecionado
  readonly topicSelected = output<string>();

  protected selectTopic(topicId: string): void {
    this.topicSelected.emit(topicId);
  }
}