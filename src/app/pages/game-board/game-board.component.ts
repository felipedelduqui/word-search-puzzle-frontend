import { Component, OnInit, signal, computed, effect, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleService } from '../../core/services/puzzle';
import { Difficulty, TopicItem } from '../../core/models/puzzle.model';

interface CellCoords {
  row: number;
  col: number;
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss',
})
export class GameBoardComponent implements OnInit {
  // Application State Management via Signals
  protected readonly title = signal('Word Search Puzzle');
  protected readonly topics = signal<TopicItem[]>([
    { id: 'pokemon', name: 'Pokémon', imageUrl: 'https://vofoegntfdlyoqiloqwz.supabase.co/storage/v1/object/public/puzzle-images/pokemon_card.PNG?t=123456789' },
    { id: 'friends', name: 'Friends', imageUrl: 'https://vofoegntfdlyoqiloqwz.supabase.co/storage/v1/object/public/puzzle-images/friends_card.PNG?t=123456789' },
    { id: 'animals', name: 'Animals', imageUrl: 'https://vofoegntfdlyoqiloqwz.supabase.co/storage/v1/object/public/puzzle-images/default_card.PNG?t=123456789' },
  ]);

  protected readonly selectedTopic = signal<string>('pokemon');
  protected readonly selectedDifficulty = signal<Difficulty>('EASY');
  
  // Game Matrix and Words State
  protected readonly grid = signal<string[][]>([]);
  protected readonly targetWords = signal<string[]>([]);
  protected readonly foundWords = signal<Set<string>>(new Set());
  
  // User Selection Interaction Tracking State
  protected readonly isSelecting = signal<boolean>(false);
  protected readonly selectionStart = signal<CellCoords | null>(null);
  protected readonly selectionCurrent = signal<CellCoords | null>(null);

  // Audio assets instances for word success and ultimate match victory
  private readonly successAudio = new Audio('/audio/mixkit-electronic-lock-success-beeps-2852.wav');
  private readonly victoryAudio = new Audio('/audio/mixkit-fantasy-game-success-notification-270.wav');

  // Computes the words remaining to find dynamically
  protected readonly remainingCount = computed(() => {
    return this.targetWords().length - this.foundWords().size;
  });

  // Dynamic evaluation pipeline mapping for specific mode rules descriptions
  protected readonly difficultyDescription = computed(() => {
    const descriptions: Record<Difficulty, string> = {
      EASY: 'Easy Mode: Words are hidden orthogonally (left to right, or top to bottom).',
      MEDIUM: 'Medium Mode: Words are hidden orthogonally and diagonally, but only from left/top to right/bottom.',
      HARD: 'Hard Mode: Words are hidden orthogonally and diagonally in any direction (including reverse).'
    };
    return descriptions[this.selectedDifficulty()];
  });

  constructor(private puzzleService: PuzzleService) {
    // Automatically re-fetch data whenever configuration triggers change
    effect(() => {
      this.loadNewPuzzle(this.selectedTopic(), this.selectedDifficulty());
    });
  }

  ngOnInit(): void {}

  @HostListener('window:mouseup')
  protected onMouseUp(): void {
    if (!this.isSelecting()) return;
    this.evaluateCurrentSelection();
    this.clearSelection();
  }

  protected loadNewPuzzle(topic: string, difficulty: Difficulty): void {
    this.puzzleService.generatePuzzle(topic, difficulty).subscribe({
      next: (response) => {
        this.grid.set(response.grid);
        this.targetWords.set(response.words);
        this.foundWords.set(new Set());
        this.clearSelection();
      },
      error: (err) => console.error('Failed to resolve matrix composition stream:', err)
    });
  }

  protected selectTopic(topicId: string): void {
    this.selectedTopic.set(topicId);
  }

  protected selectDifficulty(difficulty: Difficulty): void {
    this.selectedDifficulty.set(difficulty);
  }

  // --- Interaction Mechanics Matrix Event Handlers ---

  protected onCellMouseDown(row: number, col: number): void {
    this.isSelecting.set(true);
    this.selectionStart.set({ row, col });
    this.selectionCurrent.set({ row, col });
  }

  protected onCellMouseEnter(row: number, col: number): void {
    if (!this.isSelecting()) return;
    this.selectionCurrent.set({ row, col });
  }

  private clearSelection(): void {
    this.isSelecting.set(false);
    this.selectionStart.set(null);
    this.selectionCurrent.set(null);
  }

  private evaluateCurrentSelection(): void {
    const start = this.selectionStart();
    const end = this.selectionCurrent();
    if (!start || !end) return;

    const word = this.extractStringFromPath(start, end);
    const reversedWord = word.split('').reverse().join('');

    if (this.targetWords().includes(word) && !this.foundWords().has(word)) {
      this.markWordAsFound(word);
    } else if (this.targetWords().includes(reversedWord) && !this.foundWords().has(reversedWord)) {
      this.markWordAsFound(reversedWord);
    }
  }

  private extractStringFromPath(start: CellCoords, end: CellCoords): string {
    const dRow = Math.sign(end.row - start.row);
    const dCol = Math.sign(end.col - start.col);
    
    let currRow = start.row;
    let currCol = start.col;
    let extracted = '';

    const steps = Math.max(Math.abs(end.row - start.row), Math.abs(end.col - start.col));

    for (let i = 0; i <= steps; i++) {
      extracted += this.grid()[currRow][currCol];
      currRow += dRow;
      currCol += dCol;
    }
    return extracted;
  }

  private markWordAsFound(word: string): void {
    const updatedSet = new Set(this.foundWords());
    updatedSet.add(word);
    this.foundWords.set(updatedSet);
    
    if (this.remainingCount() === 0) {
      this.playVictorySound();
    } else {
      this.playSuccessSound();
    }
  }

  private playSuccessSound(): void {
    this.successAudio.currentTime = 0;
    this.successAudio.play().catch(err => console.warn('Audio playback blocked by browser policies:', err));
  }

  private playVictorySound(): void {
    this.victoryAudio.currentTime = 0;
    this.victoryAudio.play().catch(err => console.warn('Audio playback blocked by browser policies:', err));
  }

  protected isCellPermanentlyFound(row: number, col: number): boolean {
    const words = this.targetWords();
    const confirmedSet = this.foundWords();
    if (confirmedSet.size === 0) return false;

    for (const word of words) {
      if (confirmedSet.has(word)) {
        if (this.checkWordGridPresence(word, row, col)) {
          return true;
        }
      }
    }
    return false;
  }

  private checkWordGridPresence(word: string, targetRow: number, targetCol: number): boolean {
    const matrix = this.grid();
    const rowsCount = matrix.length;
    const colsCount = matrix[0]?.length || 0;
    const wordLen = word.length;

    const directions = [
      { r: 0, c: 1 },  { r: 0, c: -1 },
      { r: 1, c: 0 },  { r: -1, c: 0 },
      { r: 1, c: 1 },  { r: -1, c: -1 },
      { r: 1, c: -1 }, { r: -1, c: 1 }
    ];

    for (let r = 0; r < rowsCount; r++) {
      for (let c = 0; c < colsCount; c++) {
        for (const dir of directions) {
          let k;
          let match = true;
          for (k = 0; k < wordLen; k++) {
            const nextR = r + dir.r * k;
            const nextC = c + dir.c * k;
            if (nextR < 0 || nextR >= rowsCount || nextC < 0 || nextC >= colsCount || matrix[nextR][nextC] !== word[k]) {
              match = false;
              break;
            }
          }
          if (match) {
            for (let i = 0; i < wordLen; i++) {
              if (r + dir.r * i === targetRow && c + dir.c * i === targetCol) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  protected isCellSelected(row: number, col: number): boolean {
    const start = this.selectionStart();
    const end = this.selectionCurrent();
    if (!start || !end) return false;

    const minR = Math.min(start.row, end.row);
    const maxR = Math.max(start.row, end.row);
    const minC = Math.min(start.col, end.col);
    const maxC = Math.max(start.col, end.col);

    const isHorizontal = start.row === end.row;
    const isVertical = start.col === end.col;
    const isDiagonal = Math.abs(start.row - end.row) === Math.abs(start.col - end.col);

    if (!isHorizontal && !isVertical && !isDiagonal) return false;

    if (isHorizontal) return row === start.row && col >= minC && col <= maxC;
    if (isVertical) return col === start.col && row >= minR && row <= maxR;
    
    const belongsToBox = row >= minR && row <= maxR && col >= minC && col <= maxC;
    if (belongsToBox) {
      return Math.abs(row - start.row) === Math.abs(col - start.col);
    }

    return false;
  }
}