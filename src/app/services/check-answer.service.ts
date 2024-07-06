import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckAnswerService {

  constructor() { }

  public checkAnswer(hiddenWord: string, guessed: string) {
    if (guessed === hiddenWord) {
      return true;
    } else return false;
  }
}
