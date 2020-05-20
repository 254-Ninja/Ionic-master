import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {ProductService} from '../services/product.service';
import {AlertService} from '../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  loading: any;
  alert: any;
  successAlert: any;
  buyAlert: any;
  flagAlert: any;
  rateAlert: any;
  data: any;
  product: any;
  image: any;
  price: any;
  userRole: any;
  userName: any;
  ratingsDefault: any;
  client: any;
  category: any;
  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private productService: ProductService,
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
    this.ratingsDefault = {
      rating : 1,
      max: 5
    };
    this.authService.user().subscribe(
        client => {
          this.client = client;
          this.category = this.client['category'];
        }
    );

    this.route.queryParams.subscribe(params => {
      if (params && params.productId) {
        this.data = params.productId;
        this.authService.getProduct(this.data).subscribe(
            product => {
                this.hideLoading();
                if (product.success) {
                    this.product = product.product;
                    this.image = product.image;
                    this.price = product.price;
                    this.userRole = product.userRole;
                    this.userName = product.userName;
                } else {
                    this.showError(product.message);
                }
            }
        );
      }
    });
  }


  onRateChange(rateNo) {
    console.log(rateNo);
    this.ratePrompt(rateNo);
  }

  ratePrompt(rateNum) {
    this.rateAlert = this.alertCtrl.create({
      header: 'Rate Product',
      message: 'Are you sure you want to rate this product with ' + rateNum + ' stars?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Rate',
          handler: () => {
            console.log('Rate clicked');
            this.showLoading();
            const rateProd = {
              productId: this.data,
              rating: rateNum
            };
            this.authService.rateProduct(rateProd).subscribe(
                rates => {
                  this.hideLoading();
                  if (rates.success) {
                    this.showSuccess(rates.message);
                  } else {
                    this.showError(rates.message);
                  }
                }
            );
          }
        }
      ]
    }).then((popupRate) => {
      popupRate.present();
    });
  }

  buyPrompt() {
    this.buyAlert = this.alertCtrl.create({
      header: 'Buy Product',
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Enter Quantity in ' + this.product.unit_of_measure
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: data => {
            if (data.quantity) {
              this.showLoading();
              const buyOrder = {
                  productId: this.data,
                  quantity: data.quantity
              };
              this.authService.createOrder(buyOrder).subscribe(
                  buyProduct => {
                    this.hideLoading();
                    if (buyProduct.success) {
                      this.showSuccess(buyProduct.message);
                    } else {
                      this.showError(buyProduct.message);
                    }
                  }
              );
            } else {
              return false;
            }
          }
        }
      ]
    }).then((popupBuy) => {
      popupBuy.present();
    });
  }

  flagPrompt() {
    this.flagAlert = this.alertCtrl.create({
      header: 'Flag Product',
      inputs: [
        {
          name: 'reason',
          placeholder: 'Give Reason For Flagging Product '
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Flag',
          handler: data => {
            if (data.reason) {
              this.showLoading();
              const flagProd = {
                productId: this.data,
                reason: data.reason
              };
              this.authService.flagProduct(flagProd).subscribe(
                  flagP => {
                    this.hideLoading();
                    if (flagP.success) {
                      this.showSuccess(flagP.message);
                    } else {
                      this.showError(flagP.message);
                    }
                  }
              );
            } else {
              return false;
            }
          }
        }
      ]
    }).then((popupBuy) => {
      popupBuy.present();
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

  showSuccess(text) {
    this.loadingCtrl.dismiss();

    this.successAlert = this.alertCtrl.create({
      header: 'Success',
      message: text,
      buttons: ['OK']
    }).then((popup) => {
      popup.present();
    });
  }
}
