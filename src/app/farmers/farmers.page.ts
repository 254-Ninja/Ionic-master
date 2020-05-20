import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {ProductService} from '../services/product.service';
import {AlertService} from '../services/alert.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.page.html',
  styleUrls: ['./farmers.page.scss'],
})
export class FarmersPage implements OnInit {

  loading: any;
  alert: any;
  searchFarmer: string;
  searchLocationFarmer: string;
  farmers: any;

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
    this.searchFarmer = '';
    this.searchLocationFarmer = '';
    this.authService.farmers().subscribe(
        farmLists => {
          this.farmers = farmLists.farmers;
          this.hideLoading();
        }
    );
  }

  openFarmer(farmerId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        farmerId: farmerId
      }
    };
    this.router.navigate(['farmer'], navigationExtras);
  }

  setFilteredFarmers() {
    this.farmers = this.authService.filterFarmers(this.searchFarmer);
  }

  setLocationFilteredFarmers() {
    this.farmers = this.authService.filterLocationFarmers(this.searchLocationFarmer);
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
