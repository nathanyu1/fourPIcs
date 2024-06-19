import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FrameBuilderService } from '../services/frame-builder.service';
import { CommonModule } from '@angular/common';
import { FrameComponent } from '../frame/frame.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FrameComponent, InputComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit {
  public images: string[] = [];
  public word: string = '';

  constructor(private frameBuilder: FrameBuilderService) {}

  ngOnInit(): void {
    this.images = this.getImages('healthy').images;
    this.word = this.getImages('healthy').word;
    console.log(this.images);
    console.log(this.word);
  }

  public getImages(word: string) {
    return this.frameBuilder.buildFrame(word);
  }
}
