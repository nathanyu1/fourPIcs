import { Component, ElementRef, OnInit, QueryList, ViewChildren, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  private word: string = '';
  private wordLength: number = 0;
  public wordArr: string[] = [];
  @ViewChildren('wordInput') inputs!: QueryList<ElementRef>;

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

    if (event.code === 'Backspace') {
      event.preventDefault()
      if (parseInt(event.target.id) === this.wordLength-1 &&
        event.target.value !== '') {
          element = inputArray[event.target.id].nativeElement;
          element.value = '';
          console.log('last element deleted');
      }
      else if (event.target.id > 0 && event.target.value === '') {
          console.log('est');
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
  }
}
