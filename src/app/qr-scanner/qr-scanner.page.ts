import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  num: string;
  loading: any;
  alert: any;
  product: any;
  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private navCtrl: NavController,
      public barcodeScanner: BarcodeScanner,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private router: Router) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  scan() {
    this.barcodeScanner.scan().then(data => {
      this.num = data.text;
      console.log('Barcode Data');
      console.log(data);
      this.showLoading();
      this.authService.getProductBarCode(data.text).subscribe(
          product => {
            this.hideLoading();
            if (product.success) {
              this.product = product.product;
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  productId: this.product.id
                }
              };
              this.router.navigate(['product'], navigationExtras);
            } else {
              this.showError(product.message);
            }
          }
      );
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
