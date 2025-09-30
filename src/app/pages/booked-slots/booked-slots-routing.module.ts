import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedSlotsPage } from './booked-slots.page';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    component: BookedSlotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, CommonModule],
})
export class BookedSlotsPageRoutingModule {}
