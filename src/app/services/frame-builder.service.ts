import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FrameBuilderService {
  constructor() {}

  public buildFrame(word: string) {
    const imageDir = `assets/images/words/${word}`;
    const images = [
      `${imageDir}/1.webp`,
      `${imageDir}/2.webp`,
      `${imageDir}/3.webp`,
      `${imageDir}/4.webp`,
    ];
    return { word, images };
  }
}
