import { Component, Input, OnInit } from '@angular/core';
import { carouselImage } from '../../interfaces/carousel-image.interface';

@Component({
  selector: 'public-panel-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  @Input() images : carouselImage[] = []
  @Input() indicators = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 7000;

  public selectedIndex = 0;

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }

  autoSlideImages() : void{
    setInterval(() => {
      this.onNextClick();
    },this.slideInterval)
  }

  selectedImage(index : number) : void{
    this.selectedIndex = index;
  }

  onPrevClick() : void{
    if( this.selectedIndex === 0){
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick() : void{
    if( this.selectedIndex === this.images.length -1){
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
