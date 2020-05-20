import { Component } from '@angular/core';

import {MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AlertService} from './services/alert.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      // this.splashScreen.hide();
      this.authService.getToken();
    });
  }

  // When Logout Button is pressed
  logout() {
    this.authService.logout().subscribe(
        data => {
          this.menu.enable(false);
          this.alertService.presentToast('Successfully Logged Out');
        },
        error => {
          console.log(error);
        },
        () => {
          this.navCtrl.navigateRoot('/login');
        }
    );
  }
}
