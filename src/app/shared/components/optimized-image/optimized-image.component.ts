import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-optimized-image',
  templateUrl: './optimized-image.component.html',
  styleUrls: ['./optimized-image.component.css']
})
export class OptimizedImageComponent {

  @Input() src!: string;
  @Input() width: number = 300;
  @Input() height: number = 300;
  @Input() alt: string = '';
  @Input() loading: 'lazy' | 'eager' | 'auto' = 'lazy';
  @Input() errorImage: string = 'assets/images/no-image.png';

  public hasError: boolean = false;
  public isLoading: boolean = true;

  onImageLoad() {
    this.isLoading = false;
  }

  onImageError() {
    this.hasError = true;
    this.isLoading = false;
  }

  get fallbackSrc(): string {
    return this.errorImage;
  }
}