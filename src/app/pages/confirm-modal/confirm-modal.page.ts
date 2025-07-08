import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.page.html',
  styleUrls: ['./confirm-modal.page.scss'],
})
export class ConfirmModalPage implements OnInit {

  user: any;
  @Input() type = 'c';
  @Input() msg: string;

  constructor(
    protected modalCtrl: ModalController,
    protected navParams: NavParams,
    protected appService: AppService
  ) {
    this.getUserDetail();
  }

  ngOnInit() {
  }

  async dismiss(flag = false) {
    await this.modalCtrl.dismiss({ flag });
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => {
      this.user = res;
      if (this.user) {
        this.type = this.user.type;
      }
    });
  }

}
