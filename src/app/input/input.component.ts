import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    this.word = 'healthy';
    this.wordLength = this.word.length;
    this.wordArr = new Array(this.wordLength).fill('');
    console.log(this.wordArr);
  }
}
