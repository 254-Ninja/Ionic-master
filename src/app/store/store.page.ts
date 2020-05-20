import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {ProductService} from '../services/product.service';
import {AlertService} from '../services/alert.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  loading: any;
  alert: any;
  searchTerm: string;
  searchLocationTerm: string;
  products: any;
  originalProducts: any;
  grid: any;
  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private productService: ProductService,
      private navCtrl: NavController,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private alertService: AlertService,
      private router: Router) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showLoading();
    this.searchTerm = '';
    this.searchLocationTerm = '';
    this.authService.storeProducts().subscribe(
        storeProducts => {
          this.products = storeProducts.products;
          this.originalProducts = storeProducts.products;
          this.hideLoading();
        }
    );
  }

  openProduct(productId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        productId: productId
      }
    };
    this.router.navigate(['product'], navigationExtras);
  }

  setFilteredItems() {
    this.products = this.authService.filterItems(this.searchTerm);
  }

  setLocationFilteredItems() {
    this.products = this.authService.filterLocationItems(this.searchLocationTerm);
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
