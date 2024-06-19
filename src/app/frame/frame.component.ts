import { Component, OnInit } from '@angular/core';
import { FrameBuilderService } from '../services/frame-builder.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent implements OnInit {
  public images: string[] = [];
  public word: string = '';

  constructor(private frameBuilder: FrameBuilderService) {}

  ngOnInit(): void {
      this.images = this.frameBuilder.buildFrame('healthy').images;
      this.word = this.frameBuilder.buildFrame('healthy').word;
  }


}
