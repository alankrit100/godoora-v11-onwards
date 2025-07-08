import { Component, Input } from '@angular/core';
import {Image} from "./image.model";

@Component({
  selector: 'app-grid-gallery',
  templateUrl: './grid-gallery.component.html'
})
export class GridGalleryComponent{

  @Input() images: Image[];
  @Input() cols: number = 4;
  @Input() rowHeight: number = 2;
  @Input() gutterSize: number = 1;

  constructor() {
  }
  
  ngOnInit() {
  }

}
