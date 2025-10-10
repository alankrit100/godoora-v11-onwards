import {Component, Input} from '@angular/core';
import {Image} from "../image.model";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-grid-gallery-item',
  templateUrl: './grid-gallery-item.component.html',
  styleUrls: ['./grid-gallery-item.component.scss'],
  imports: [RouterModule, CommonModule]
})
export class GridGalleryItemComponent {
  @Input() item: Image;
}
