import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { Customer } from 'src/app/model/customer';
import { Transaction } from 'src/app/model/transaction';
import { AccountService } from 'src/app/service/account.service';
import { CustomerService } from 'src/app/service/customer.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  customerList: Customer[] = [];
  accountList: Account[] = [];
  showAccount: Boolean =false;
  showTransaction: Boolean =false;
  showCustomer: Boolean = true;
  transactions: Transaction[]= [];

  constructor( public customerService: CustomerService,
    private transactionService: TransactionService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
        (data) => {
            this.customerList = data;
            console.log(this.customerList);
        },
        (error) => {
            console.log(error);
        }
    );
}
selectCustomer(event){
  console.log(event.value[0].id);
  this.getAccountsByCustomer(event.value[0].id);
  this.showCustomer =false;
  this.showAccount =true;
}

selectAccount(event){
console.log(event.value[0]);
this.getTransactionSummary(event.value[0].customerId, event.value[0].id);
this.showAccount = false;
this.showTransaction = true;
}

getAccountsByCustomer(customerId: number): void{
  
  this.accountService.getAccountsByCustomer(customerId)
    .subscribe(
      data => {
        this.accountList = data;
        console.log(this.accountList);
      },
      error => {
        console.log(error);
      });
}
showCustomers(){
  this.showCustomer =true;
  this.showAccount =false;
}

getTransactionSummary(customerId: number, accountId: number): void {
  this.transactionService.getAllTransaction(customerId, accountId).subscribe(
      (data) => {
          this.transactions = data;
          console.log(this.transactions);
      },
      (error) => {
          console.log(error);
      }
  );
}

showAccounts(){
this.showAccount = true;
this.showTransaction = false;
}

}
