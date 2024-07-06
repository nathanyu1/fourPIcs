import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckAnswerService } from '../services/check-answer.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  animations:[trigger('wrongAnswer', [
    transition('false => true', [
      animate('0.5s', keyframes([
        style({ transform: 'translate3d(-1px, 0, 0)', backgroundColor: 'red', offset: 0.1 }),
        style({ transform: 'translate3d(2px, 0, 0)', backgroundColor: 'red', offset: 0.2 }),
        style({ transform: 'translate3d(-5px, 0, 0)', backgroundColor: 'red', offset: 0.3 }),
        style({ transform: 'translate3d(5px, 0, 0)', backgroundColor: 'red', offset: 0.4 }),
        style({ transform: 'translate3d(-5px, 0, 0)', backgroundColor: 'red', offset: 0.5 }),
        style({ transform: 'translate3d(4px, 0, 0)', backgroundColor: 'red', offset: 0.6 }),
        style({ transform: 'translate3d(-4px, 0, 0)', backgroundColor: 'red', offset: 0.7 }),
        style({ transform: 'translate3d(2px, 0, 0)', backgroundColor: 'red', offset: 0.8 }),
        style({ transform: 'translate3d(0, 0, 0)', backgroundColor: 'red', offset: 0.9 })
      ])),
      animate('0.3s', style({ backgroundColor: 'white' }))
    ])
  ]), trigger('jump', [
    state('normal', style({
      transform: 'translateY(0)',
    })),
    state('jumped', style({
      transform: 'translateY(-20px)',
      backgroundColor: '#39e75f'
    })),
    state('finished', style({
      transform: 'translateY(0)',
      backgroundColor: '#39e75f',
    })),
    transition('normal => jumped', [
      animate('0.2s ease-in-out')
    ]),
    transition('jumped => finished', [
      animate('0.2s ease-in-out')
    ]),
  ])]
})

export class InputComponent implements OnInit {
  private word: string = '';
  private wordLength: number = 0;
  public wordArr: string[] = [];
  public isFull: boolean = false;
  @ViewChildren('wordInput') inputs!: QueryList<ElementRef>;
  public disableSubmit = false;
  public inputInvalid: boolean = false;
  public jumpState = 'normal';

  private triggerJump() {
    this.jumpState = 'jumped';
    setTimeout(() => {
      this.jumpState = 'finished';
    }, 300)
  }
  private triggerShake() {
    this.inputInvalid = true;
    setTimeout(() => {
      this.inputInvalid = false;
    }, 800)
  }

  constructor(private checkAnswerService: CheckAnswerService) {}
  
  ngOnInit(): void {
    this.word = 'healthy';
    this.wordLength = this.word.length;
    this.wordArr = new Array(this.wordLength).fill('');
    console.log(this.wordArr);
  }

  public focusInput() {
    const inputArray = this.inputs.toArray();
    let full = true;
    for (let i = 0; i < this.wordLength; i++) {
      if (inputArray[i].nativeElement.value === '') {
        inputArray[i].nativeElement.focus();
        full = false;
        break;
      }
    }
    if (full) {
      inputArray[this.wordLength-1].nativeElement.focus();
      console.log('array is full');
    }
  }

  public onInput(event) {
    let element;
    let inputArray = this.inputs.toArray();
    console.log(event);

    if (event.code === 'Enter') {
      if (this.isFull) {
        this.onSubmit();
      } else {
        console.log('cant submit yet');
      }

    } else if (event.code === 'Backspace') {
      event.preventDefault()
      if (parseInt(event.target.id) === this.wordLength-1 &&
        event.target.value !== '') {
          element = inputArray[event.target.id].nativeElement;
          element.value = '';
      }
      else if (event.target.id > 0 && event.target.value === '') {
          element = inputArray[event.target.id].nativeElement;
          element.previousElementSibling.focus();
          element.previousElementSibling.value = '';
      }
    } else if (event.target.id < this.wordLength-1 && /^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault()
      element = inputArray[event.target.id].nativeElement;
      element.value = event.key.toUpperCase();
      element.nextElementSibling.focus();
    } else if (event.target.value === '' && /^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
      element = inputArray[event.target.id].nativeElement
      element.value = event.key.toUpperCase();
      element.focus();
    } else {
      event.preventDefault();
    }
    this.checkIfValid();
  }

  private checkIfValid() {
    const inputArray = this.inputs.toArray();
      if (inputArray[this.wordLength-1].nativeElement.value === '') {
        this.isFull = false;
      } else {
        this.isFull = true;
      }
  }

  public onSubmit() {
    if (!this.disableSubmit) {
      const finalGuess = this.inputs.toArray().map((input) => {
        return input.nativeElement.value;
      }).join('').toLowerCase();

      console.log(finalGuess);
      const result = this.checkAnswerService.checkAnswer(this.word, finalGuess)

      if (!result) {
        this.triggerShake();
      } else {
        this.triggerJump();
        this.disableSubmit = true;
      }
    }
  }

}
