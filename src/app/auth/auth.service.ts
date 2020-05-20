import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import {Userlogin} from './userlogin';
import {Client} from '../home/client';
import {Product} from '../products/product';
import {ProductResponse} from '../products/product-response';
import {StoreResponse} from '../store/store-response';
import {OneProduct} from '../product/one-product';
import {Farmers} from '../farmers/farmers';
import {Companies} from '../processingcompany/companies';
import {OneUser} from './one-user';
import {BuyResponse} from '../product/buy-response';
import {Buy} from '../product/buy';
import {Rate} from '../product/rate';
import {AllResponse} from '../home/all-response';
import {Flag} from '../product/flag';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS  =  'http://139.162.215.138/api';
  authSubject  =  new  BehaviorSubject(false);
  token: any;
  public productList: any = [];
  public farmersList: any = [];
  public companiesList: any = [];

  constructor(private  httpClient: HttpClient, private  storage: Storage) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
        tap((res: AuthResponse ) => {

          if (res.success) {
            this.authSubject.next(true);
            return res;
          } else {
            this.authSubject.next(false);
            return res;
          }
        })

    );
  }

  login(userlogin: Userlogin): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, userlogin).pipe(
        tap((res: AuthResponse) => {

          if (res.success) {
            this.storage.set('TOKEN', res);
            this.authSubject.next(true);
            this.token = res;
            return res;
          } else {
            this.authSubject.next(false);
            return res;
          }
        })
    );
  }

  user() {
      const headers = new HttpHeaders({
          Authorization: this.token.token_type + '' + this.token.access_token
      });
      return this.httpClient.get<Client>(this.AUTH_SERVER_ADDRESS + '/user', {headers})
          .pipe(
              tap((res: Client) => {
                  return res;
              })
          );
  }

  createOrder(order: Buy): Observable<BuyResponse> {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.post<BuyResponse>(`${this.AUTH_SERVER_ADDRESS}/create_order`, order, {headers}).pipe(
            tap((res: BuyResponse ) => {
                return res;
            })

        );
  }

  rateProduct(rating: Rate): Observable<AllResponse> {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.post<AllResponse>(`${this.AUTH_SERVER_ADDRESS}/rate_product`, rating, {headers}).pipe(
            tap((res: AllResponse ) => {
                return res;
            })

        );
  }

  flagProduct(flag: Flag): Observable<AllResponse> {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.post<AllResponse>(`${this.AUTH_SERVER_ADDRESS}/flag_product`, flag, {headers}).pipe(
            tap((res: AllResponse ) => {
                return res;
            })

        );
  }

  productSubmit(product: Product, photoFile: File): Observable<ProductResponse> {
      const formData = new FormData();
      if (product instanceof Object) {
          Object.keys(product).forEach(key => {
              const value = product[key];
              formData.append(key, value);
              console.log(key);
              console.log(value);
          });
      }
      formData.append('photo', photoFile, photoFile.name);
      const headers = new HttpHeaders({
          Authorization: this.token.token_type + '' + this.token.access_token,
      });
      return this.httpClient.post<ProductResponse>(`${this.AUTH_SERVER_ADDRESS}/create_product`, formData, { headers }).pipe(
            tap((res: ProductResponse ) => {
                return res;
            })

        );
  }

  storeProducts() {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.get<StoreResponse>(this.AUTH_SERVER_ADDRESS + '/get_products', {headers})
            .pipe(
                tap((res: StoreResponse) => {
                    this.productList = res.products;
                    return res;
                })
            );
  }

  farmers() {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.get<Farmers>(this.AUTH_SERVER_ADDRESS + '/get_farmers', {headers})
            .pipe(
                tap((res: Farmers) => {
                    this.farmersList = res.farmers;
                    return res;
                })
            );
  }

  companies() {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.get<Companies>(this.AUTH_SERVER_ADDRESS + '/get_pcs', {headers})
            .pipe(
                tap((res: Companies) => {
                    this.companiesList = res.companies;
                    return res;
                })
            );
  }

  filterItems(searchTerm: any) {
        return this.productList.filter(item => {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
  }

  filterLocationItems(searchLocationTerm: any) {
        return this.productList.filter(item => {
            return item.location.toLowerCase().indexOf(searchLocationTerm.toLowerCase()) > -1;
        });
  }

  filterFarmers(searchFarmer: any) {
        return this.farmersList.filter(item => {
            return item.name.toLowerCase().indexOf(searchFarmer.toLowerCase()) > -1;
        });
  }

  filterLocationFarmers(searchFarmerTerm: any) {
        return this.farmersList.filter(item => {
            return item.location.toLowerCase().indexOf(searchFarmerTerm.toLowerCase()) > -1;
        });
  }

  filterCompanies(searchCompany: any) {
        return this.companiesList.filter(item => {
            return item.name.toLowerCase().indexOf(searchCompany.toLowerCase()) > -1;
        });
  }

  filterLocationCompanies(searchCompanyTerm: any) {
        return this.companiesList.filter(item => {
            return item.location.toLowerCase().indexOf(searchCompanyTerm.toLowerCase()) > -1;
        });
  }

  getProduct(productId: any) {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.get<OneProduct>(this.AUTH_SERVER_ADDRESS + '/get_product/' + productId, {headers})
            .pipe(
                tap((res: OneProduct) => {
                    return res;
                })
            );
  }

  getProductBarCode(barCode: any) {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.get<OneProduct>(this.AUTH_SERVER_ADDRESS + '/get_product_barcode/' + barCode, {headers})
            .pipe(
                tap((res: OneProduct) => {
                    return res;
                })
            );
  }

  getUser(userId: any) {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.get<OneUser>(this.AUTH_SERVER_ADDRESS + '/get_user/' + userId, {headers})
            .pipe(
                tap((res: OneUser) => {
                    return res;
                })
            );
  }

  logout() {
        const headers = new HttpHeaders({
            Authorization: this.token.token_type + '' + this.token.access_token
        });
        return this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/logout', { headers })
            .pipe(
                tap(data => {
                    this.storage.remove('TOKEN');
                    this.authSubject.next(false);
                    delete this.token;
                    return data;
                })
            );
  }


  getToken() {
        return this.storage.get('TOKEN').then(
            data => {
                this.token = data;
                if (this.token != null) {
                    this.authSubject.next(true);
                } else {
                    this.authSubject.next(false);
                }
            },
            error => {
                this.token = null;
                this.authSubject.next(false);
            }
        );
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
