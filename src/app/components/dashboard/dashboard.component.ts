import { Component, OnInit } from '@angular/core';


import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/model/customer';
import { AccountService } from 'src/app/service/account.service';
import { Account } from 'src/app/model/account';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    
    customerList: Customer[] = [];
    customerCount: number;
    accountCount: number;
    accountList: Account[] = [];
    transactions: Transaction[] = [];
    totalDepositAmount: number;
    totalWithdrawalAmount: number;
    currentDate: Date;
    dataListDeposit: Transaction[] = [];
    dataListWithdrawal: Transaction[] = [];

    constructor(
        private customerService: CustomerService,
        private accountService: AccountService,
        private transactionService: TransactionService,
        public datepipe: DatePipe,
    ) {}

    ngOnInit() {
        this.getAllCustomers();
        this.getAllAccounts();
        this.getAllTransactionSummary();
        this.currentDate = new Date();

        
    }

    getAllCustomers(): void {
        this.customerService.getAllCustomers().subscribe(
            (data) => {
                this.customerList = data;
                this.customerCount = this.customerList.length;
                console.log(this.customerList);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getAllAccounts(): void {
        this.accountService.getAllAccounts().subscribe(
            (data) => {
                this.accountList = data;
                this.accountCount = this.accountList.length;
                console.log(this.accountList);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getAllTransactionSummary(): void {
        this.transactionService.getAllTransactionSummary().subscribe(
            (data) => {
                this.transactions = data;

                this.dataListDeposit = this.transactions.filter(
                    (i) =>
                    this.datepipe.transform(i.transactionDate, 'yyyy-MM-dd') ==
                    this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')  &&
                        i.transactionType == 'deposit'
                );
                this.totalDepositAmount = this.dataListDeposit.reduce(
                    (acc, cur) => acc + cur.transactionAmount,
                    0
                );
                this.dataListWithdrawal = this.transactions.filter(
                    (i) =>
                    this.datepipe.transform(i.transactionDate, 'yyyy-MM-dd') ==
                    this.datepipe.transform(this.currentDate, 'yyyy-MM-dd') &&
                        i.transactionType == 'withdrawal'
                );
                this.totalWithdrawalAmount = this.dataListWithdrawal.reduce(
                    (acc, cur) => acc + cur.transactionAmount,
                    0
                );
                console.log(this.transactions);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
