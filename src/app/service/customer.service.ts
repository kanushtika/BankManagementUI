import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
    
    ) { }

    // createCustomer(customer: Customer) {
    //   return this.http.post(environment.apiBaseURI + '/create/customer', customer).
    //   subscribe((response) => {
    //     console.log('submit was completed');
        
    //   }, (err) => {
    //     console.log(err);
        
    //   }
    //   );
  
    // }

    createCustomer(customer: Customer): Observable<any> {
      return this.http.post(environment.apiBaseURI + '/create/customer', customer);
    }

    getAllCustomers(): Observable<Customer[]> {
      return this.http.get<Customer[]>(environment.apiBaseURI + '/customers');
    }
}
