import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { GridGalleryItemComponent } from './grid-gallery-item/grid-gallery-item.component';
import { Image } from './image.model';

@Component({
  standalone: true,
  selector: 'app-grid-gallery',
  imports: [
    CommonModule,
    GridGalleryItemComponent,
  ],
  templateUrl: './grid-gallery.component.html'
})
export class GridGalleryComponent {
  @Input() images: Image[];
  @Input() cols: number = 4;
  @Input() rowHeight: number = 2;
  @Input() gutterSize: number = 1;
}
