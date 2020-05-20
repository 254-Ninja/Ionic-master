import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {ProductService} from '../services/product.service';
import {AlertService} from '../services/alert.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-processingcompany',
  templateUrl: './processingcompany.page.html',
  styleUrls: ['./processingcompany.page.scss'],
})
export class ProcessingcompanyPage implements OnInit {

  loading: any;
  alert: any;
  searchCompany: string;
  searchLocationCompany: string;
  companies: any;

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
    this.searchCompany = '';
    this.searchLocationCompany = '';
    this.authService.companies().subscribe(
        comLists => {
          this.companies = comLists.companies;
          this.hideLoading();
        }
    );
  }

  openCompany(companyId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        companyId: companyId
      }
    };
    this.router.navigate(['company'], navigationExtras);
  }

  setFilteredCompanies() {
    this.companies = this.authService.filterCompanies(this.searchCompany);
  }

  setLocationFilteredCompanies() {
    this.companies = this.authService.filterLocationCompanies(this.searchLocationCompany);
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
