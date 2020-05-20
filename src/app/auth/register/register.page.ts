import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {AlertController, LoadingController } from '@ionic/angular';
import {ProductService} from '../../services/product.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loading: any;
  alert: any;
  categories: any;

  constructor(private  authService: AuthService, private  router: Router, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,  private productService: ProductService, private alertService: AlertService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.productService.getCategories().subscribe(
        categories => {
          this.categories = categories.data;
        }
    );
  }

  register(form) {
    this.showLoading();
    this.authService.register(form.value).subscribe((res) => {
      this.hideLoading();
      if (res.success) {
        this.alertService.presentToast(res.message);
        this.router.navigateByUrl('login');
      } else {
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
