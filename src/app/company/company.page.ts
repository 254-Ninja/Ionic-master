import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {AlertService} from '../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {

  loading: any;
  alert: any;
  data: any;
  image: any;
  company: any;
  category: any;
  rate: any;
  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private navCtrl: NavController,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private alertService: AlertService,
      private route: ActivatedRoute,
      private router: Router) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showLoading();
    this.route.queryParams.subscribe(params => {
      if (params && params.companyId) {
        this.data = params.companyId;
        this.authService.getUser(this.data).subscribe(
            userDetails => {
              this.hideLoading();
              if (userDetails.success) {
                this.company = userDetails.appuser;
                this.category = userDetails.category;
                this.rate = userDetails.rate;
                this.image = userDetails.image;
              } else {
                this.showError(userDetails.message);
              }
            }
        );
      }
    });
  }

  onRateChange($event) {
    console.log('on Rate Change');
    console.log($event);
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
