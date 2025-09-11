import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { ModalController, IonicModule } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { UtilAlertService } from 'src/app/services/util/util-alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Vendors } from 'src/app/app.const';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { GridGalleryComponent } from './grid-gallery/grid-gallery.component';

import EmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

@Component({
  standalone: true,
  imports: [
    IonicModule,
    GridGalleryComponent,
    RouterModule,
    CommonModule,
    SafePipe,
  ],
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('embla', { static: false }) emblaRef!: ElementRef<HTMLElement>;
  private embla: EmblaCarouselType | null = null;
  private autoplayPlugin: any = null;

  slideOpts: EmblaOptionsType = { loop: true, duration: 20, align: 'start' };

  user: any;
  vendorDeatil: any;
  showDialog: boolean;
  selectedVideoUrl: any;
  limit = 15;
  totalBranches = [];
  selectedBranch = 'default';
  smallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.smallScreen = this.appService.checkSmallScreen();
  }

  constructor(
    private router: Router,
    private appService: AppService,
    private modalCtrl: ModalController,
    private utilAlertService: UtilAlertService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.totalBranches = Vendors[window.location.host];
    this.route.params.subscribe((params) => {
      localStorage.setItem('branch', 'default');
      this.selectedBranch = 'default';
      if (params && params.branch) {
        localStorage.setItem('branch', params.branch);
        this.selectedBranch = params.branch;
      }
      this.setVendor(this.selectedBranch);
    });
    this.getUserDetail();
    this.getVendorDetail();
    this.smallScreen = this.appService.checkSmallScreen();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.initEmbla(), 50);
  }

  private initEmbla() {
    if (!this.emblaRef || !this.emblaRef.nativeElement) return;

    const slides =
      this.emblaRef.nativeElement.querySelectorAll('.embla__slide');
    if (!slides || slides.length === 0) return;

    this.destroyEmbla();

    const options: EmblaOptionsType = {
      loop: true,
      align: 'start',
      skipSnaps: false,
      duration: 0,
    };

    this.autoplayPlugin = Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    });

    this.embla = EmblaCarousel(this.emblaRef.nativeElement, options, [
      this.autoplayPlugin,
    ]);
  }

  private destroyEmbla() {
    if (this.embla) {
      this.embla.destroy();
      this.embla = null;
    }
    this.autoplayPlugin = null;
  }

  scrollPrev() {
    if (!this.embla) this.initEmbla();
    this.embla?.scrollPrev();
  }

  scrollNext() {
    if (!this.embla) this.initEmbla();
    this.embla?.scrollNext();
  }

  setVendor(branch: string) {
    this.vendorDeatil = this.totalBranches.find(
      (item) => item.branch === branch
    );
    if (!this.vendorDeatil) {
      this.vendorDeatil = this.totalBranches[this.totalBranches.length - 1];
    }
    this.appService.setVendorDetail(this.vendorDeatil);
  }

  ionViewWillEnter() {
    this.getUserDetail();
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.appService.setPwaPromtObj(e);
    });
    window.addEventListener('appinstalled', () => {
      this.utilAlertService.showSuccess('Added to homescreen');
    });
  }

  navigateToBranchPage(branchDeatil) {
    if (branchDeatil.branch !== 'default') {
      this.router.navigate([`/${branchDeatil.branch}/landing`]);
    } else {
      this.router.navigate([`/landing`]);
    }
  }

  listMyBusiness() {
    if (!this.user) {
      this.openLogin();
    } else {
      if (
        this.user.firstTime === false &&
        this.user.availableDays &&
        this.user.availableDays.length
      ) {
        this.router.navigate(['/booked-customers']);
      } else {
        this.router.navigate(['/shop-keeper']);
      }
    }
  }

  bookSlot() {
    this.router.navigate(['/by-admin/', 158]);
  }
  myServices() {
    this.user
      ? this.router.navigate(['/user-shops'])
      : this.openLogin(true);
  }
  allAppointments() {
    this.user
      ? this.router.navigate(['/booked-customers'])
      : this.openLogin(true);
  }
  editShop() {
    this.user
      ? this.router.navigate(['/shop-keeper'])
      : this.openLogin(true);
  }

  bookMyAppontments() {
    if (this.user) {
      if (this.user.type === 'A' || this.user.type === 'S') {
        this.router.navigate(['/booked-customers']);
      } else {
        this.router.navigate(['/booked-slots']);
      }
    } else {
      this.openLogin(true);
    }
  }

  openLogin(enableRadio = false) {
    this.presentLoginModal(enableRadio);
  }

  async presentLoginModal(enableRadio) {
    const modal = await this.modalCtrl.create({
      cssClass: 'login-modal-page',
      animated: true,
      showBackdrop: true,
      component: LoginPage,
      componentProps: { enableRadio: enableRadio ? true : false },
    });
    modal.onDidDismiss().then((dataReturned) => {
      setTimeout(() => {
        if (this.user && dataReturned.data) {
          if (
            this.user.firstTime === false &&
            this.user.availableDays &&
            this.user.availableDays.length
          ) {
            this.router.navigate(['/booked-customers']);
          } else {
            if (this.user.type === 'A' || this.user.type === 'S') {
              this.router.navigate(['/booked-customers']);
            } else {
              this.router.navigate(['/booked-slots']);
            }
          }
        } else {
          localStorage.removeItem('user');
          this.appService.setLoginFalg(true);
          this.appService.setUserDetail(null);
        }
      });
    });
    return await modal.present();
  }

  viewGuests() {
    this.router.navigate(['/guests-list']);
  }

  getUserDetail() {
    this.appService.userDetail.subscribe((res) => (this.user = res));
  }
  getVendorDetail() {
    this.appService.vendorDeatil.subscribe((res) => {
      this.vendorDeatil = res;
      setTimeout(() => this.initEmbla(), 50); // re-init after vendor data loads
    });
  }

  showDialogMethod(slide) {
    if (slide && slide.videoId) {
      this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + slide.videoId
      );
      this.showDialog = true;
    }
    return false;
  }

  scrollToMasonry() {
    if (this.vendorDeatil.landingPage.experience.active) {
      const goyannaExp = document.getElementsByClassName('goyanna_exp');
      if (goyannaExp.length > 0) {
        goyannaExp.item(0).scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  navgigate(slide: any) {
    if (slide?.btn) {
      if (slide.btn.routerLink) {
        this.router.navigate([slide.btn.routerLink]);
      } else if (slide.btn.extLink) {
        window.open(slide.btn.extLink);
      }
    }
  }

  ngOnDestroy() {
    this.destroyEmbla();
  }
}


