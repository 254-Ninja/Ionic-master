import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { Categories } from '../auth/categories';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataSubject  =  new  BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private  storage: Storage, private env: AuthService) { }

  getCategories(): Observable<Categories> {
    return this.httpClient.get<Categories>(this.env.AUTH_SERVER_ADDRESS + '/categories')
        .pipe(
            tap((res: Categories ) => {
              return res;
            })
        );
  }
}
