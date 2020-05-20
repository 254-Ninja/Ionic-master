import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {AlertController, LoadingController, MenuController} from '@ionic/angular';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  alert: any;
  constructor(private  authService: AuthService, private  router: Router, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, private alertService: AlertService, private menu: MenuController) {
    this.menu.enable(false);
  }

  ngOnInit() {
  }

  login(form) {
    this.showLoading();
    this.authService.login(form.value).subscribe((res) => {
      this.hideLoading();
      if (res.success) {
        this.alertService.presentToast(res.message);
        this.router.navigateByUrl('home');
      } else {
        this.loadingCtrl.dismiss();
        this.showError(res.message);
      }

    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      message: 'Please Wait',
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

  hideLoading() {
    this.loadingCtrl.dismiss();
  }

  showError(text) {
    this.loadingCtrl.dismiss();

    this.alert = this.alertCtrl.create({
      header: 'Error',
      message: text,
      buttons: ['OK']
    }).then((popup) => {
      popup.present();
    });
  }

}
