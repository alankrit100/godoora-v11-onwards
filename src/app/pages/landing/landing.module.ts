import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { ComponentsModule } from '../../components/components.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatGridListModule } from '@angular/material';
import { GridGalleryComponent } from './grid-gallery/grid-gallery.component';
import { GridGalleryItemComponent } from './grid-gallery/grid-gallery-item/grid-gallery-item.component';
import { SharedModule } from 'src/app/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // IvyCarouselModule,
    ComponentsModule,
    MatGridListModule,
    CarouselModule.forRoot(),
    LandingPageRoutingModule,
    SharedModule
  ],
  declarations: [LandingPage, GridGalleryComponent, GridGalleryItemComponent]
})
export class LandingPageModule { }
