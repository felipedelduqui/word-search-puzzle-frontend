import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WordSearchResponse {
  grid: string[][];
  words: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private http: HttpClient) { }

  generatePuzzle(topicName: string, difficulty: string = 'MEDIUM'): Observable<WordSearchResponse> {
    return this.http.get<WordSearchResponse>(`/api/puzzle/${topicName}`, {
      params: { difficulty }
    });
  }
}