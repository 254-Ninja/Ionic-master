import { Component, OnInit } from '@angular/core';
import {Client} from '../home/client';
import {AlertController, LoadingController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {AlertService} from '../services/alert.service';
import {ProductService} from '../services/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  client: Client;
  loading: any;
  alert: any;
  file: File;
  public category: string;
  responseData: any;

  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private productService: ProductService,
      private navCtrl: NavController,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private alertService: AlertService) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
        client => {
          this.client = client;
          this.category = this.client['category'];
        }
    );
  }

  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  productSubmit(form) {
    this.showLoading();
    this.authService.productSubmit(form.value, this.file).subscribe((res) => {
      this.hideLoading();
      if (res.success) {
        this.alertService.presentToast(res.message);
        this.navCtrl.navigateRoot('/store');
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
