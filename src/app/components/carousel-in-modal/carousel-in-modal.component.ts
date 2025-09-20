import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

@Component({
  selector: 'app-carousel-in-modal',
  templateUrl: './carousel-in-modal.component.html',
  styleUrls: ['./carousel-in-modal.component.scss'],
})
export class CarouselInModalComponent {
    
  @Input() images: CarouselImage[] = [];
    
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(private modalCtrl: ModalController) {}
    
  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
