import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<any> {
    return this.http.post(environment.apiBaseURI + '/create/account', account);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.apiBaseURI + '/accountDetails');
  }

  
  getAccountsByCustomer(customerId:number): Observable<Account[]> {
    return this.http.get<Account[]>(environment.apiBaseURI + '/accounts?customerId=' +customerId);
  }
}
