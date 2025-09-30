import { Component, AfterViewInit, EnvironmentInjector } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Vendors } from './app.const';
import { AppService } from './services/app.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

declare var ga: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  vendorDetail: any;
  dataSrc = 'blue-theme';
  vendorId: string;
  bodyHeight: number = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    public environmentInjector: EnvironmentInjector // ✅ Correctly injected
  ) {
    this.setVendor();
  }

  ngOnInit() {
    const branchName = this.activatedRoute.snapshot.paramMap.get('branchName');
    console.log(branchName);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const headerHeight = document.querySelector('ion-header')?.clientHeight || 0;
      const footerHeight = document.querySelector('ion-footer')?.clientHeight || 0;
      this.bodyHeight = headerHeight + footerHeight;
    }, 1000);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setVendor() {
    let branch = localStorage.getItem('branch') || 'default';
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 3 && pathArray.includes('landing')) {
      branch = pathArray[1];
    }
    localStorage.setItem('branch', branch);

    const branchList = Vendors[window.location.host];
    if (branchList?.length) {
      this.vendorDetail = branchList.find(item => item.branch === branch) || branchList[branchList.length - 1];
      this.appService.setVendorDetail(this.vendorDetail);

      this.setManifestFile();
      this.appendGaTrackingCode();

      this.dataSrc = this.vendorDetail?.theme || '';
      document.documentElement.className = this.dataSrc;

      localStorage.setItem('originUrl', window.location.href);
      this.changeFavicon();
      this.initializeApp();
    }
  }

  private setManifestFile() {
    const manifestLink = document.querySelector('#my-manifest-placeholder') as HTMLLinkElement;
    if (this.vendorDetail && manifestLink) {
      manifestLink.href = `${environment.serverUrl}scheduling/manifestfile?categoryId=${this.vendorDetail.idCategory}`;
    }
  }

  private appendGaTrackingCode() {
    if (!this.vendorDetail) return;

    try {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '${this.vendorDetail.gAnalyticscode || 'UA-144064030-1'}', 'auto');
      `;
      document.head.appendChild(script);

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    } catch (ex) {
      console.error('Error appending Google Analytics script', ex);
    }
  }

  private changeFavicon() {
    if (!this.vendorDetail) return;

    const link = this.vendorDetail.favIconLink;
    document.title = this.vendorDetail.title || document.title;

    let favicon: HTMLLinkElement = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = link;
    } else {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = link;
      document.head.appendChild(favicon);
    }
  }
}
