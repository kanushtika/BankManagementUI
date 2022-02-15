import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

 transferAmmount(transaction: Transaction): Observable<any> {
    return this.http.post(environment.apiBaseURI + '/trasfer', transaction);
  }

  getAllTransaction(customerId:number, accountId:number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(environment.apiBaseURI + '/transaction?customerId=' +customerId + '&accountId=' +accountId );
  }

  getAllTransactionSummary(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(environment.apiBaseURI + '/transaction/summary' );
  }
}
