import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import {Client} from './client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  client: Client;
  constructor(
      private menu: MenuController,
      private authService: AuthService,
      private navCtrl: NavController) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
        client => {
            console.log('Client Details');
            console.log(client);
          this.client = client;
        }
    );
  }

  products() {
    this.navCtrl.navigateRoot('/products');
  }
  store() {
    this.navCtrl.navigateRoot('/store');
  }

  scan() {
    this.navCtrl.navigateRoot('/scanner');
  }

  orders() {
    this.navCtrl.navigateRoot('/orders');
  }
  farmers() {
    this.navCtrl.navigateRoot('/farmers');
  }

  companies() {
    this.navCtrl.navigateRoot('/companies');
  }



}
