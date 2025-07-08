import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UiSwitchModule.forRoot({
      size: 'medium',
      color: '#d0d4d6',
      switchColor: '#92989c',
      defaultBgColor: 'rgb(236, 240, 245)',
      checkedLabel: 'Hotel Guest',
      uncheckedLabel: 'Visitor'
    }),
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
