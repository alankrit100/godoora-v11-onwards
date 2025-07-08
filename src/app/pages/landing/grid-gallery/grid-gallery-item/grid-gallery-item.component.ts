import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {Image} from "../image.model";

@Component({
  selector: 'app-grid-gallery-item',
  templateUrl: './grid-gallery-item.component.html',
  styleUrls: ['./grid-gallery-item.component.scss']
})
export class GridGalleryItemComponent {

  @Input() item: Image;
  @Input() rowHeight: number = 1;
  @Input() gutterSize: number = 1;
  @ViewChild('img', {static: true}) img: ElementRef;

  public rows: number = 0;
  currentTime = new Date().getTime();

  @HostListener('window:resize')
  onWindowResize(){
    this.calculateRows();
  }

  calculateRows() {
    setTimeout(() => {
      if(this.img) {
        this.rows = Math.floor(this.img.nativeElement.offsetHeight / (this.rowHeight + this.gutterSize));
      }
    }, 10)
  }
 
}
