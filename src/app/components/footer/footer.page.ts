import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit, AfterViewInit {

  showBtn = false;
  deferredPrompt = null;
  vendorDeatil: any;

  constructor(
    private appService: AppService,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.getVendorDeatil();
  }

  ngAfterViewInit() {
    this.getDeferredPrompt();
    setTimeout(() => {
      const appInstalled = localStorage.getItem('appInstalled') ? JSON.parse(localStorage.getItem('appInstalled')) : false;
      const remindLater = sessionStorage.getItem('remindLater') ? JSON.parse(sessionStorage.getItem('remindLater')) : false;
      if(!appInstalled && !remindLater) {
        this.presentAlertConfirm();
      }
    }, ((this.vendorDeatil && this.vendorDeatil.pwaInstallTimer) ? this.vendorDeatil.pwaInstallTimer : 3000));
  }

  addToHome() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // alert('User accepted the prompt');
          localStorage.setItem('appInstalled', JSON.stringify(true));
        } else {
          // alert('User dismissed the prompt');
        }
        this.deferredPrompt = null;
      });
    }
  }

  getDeferredPrompt() {
    this.appService.pwaPromtObj.subscribe((res) => {
      if (res) {
        this.deferredPrompt = res;
      }
    });
  }

  getVendorDeatil() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
    });
  }

  async presentAlertConfirm() {
    if(this.deferredPrompt) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Install App?',
        message: 'Looks like you are enjoying using the experience app! Do you want to add a shortcut to your screen?',
        buttons: [
          {
            text: 'Remind me later',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              sessionStorage.setItem('remindLater', JSON.stringify(true));
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'OK',
            handler: () => {
              this.addToHome();
            }
          }
        ]
      });
      await alert.present();
    }
  }

}
