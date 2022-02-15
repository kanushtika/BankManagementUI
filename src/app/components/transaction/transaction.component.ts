import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Account } from 'src/app/model/account';
import { Transaction } from 'src/app/model/transaction';
import { AccountService } from 'src/app/service/account.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactionForm:FormGroup;
  accountList: Account[] = [];
  account: Account; 
  transactions: Transaction[] = []; 
  isValidAccount: Boolean;
  dropdownItems = [
    { name: 'Deposit', code: 'deposit' },
    { name: 'Withdrawal', code: 'withdrawal' }
    
];
  constructor(private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.transactionCreateForm();
    this.getAllAccounts();
    
  }

  transactionCreateForm() {
    this.transactionForm = this.formBuilder.group({
      customerName : [null, Validators.required],
      accountNumber : [null, Validators.required],
      transactionAmount: [null, Validators.required],
      transactionType: [this.dropdownItems[0], Validators.required],    
     
    });
  }

  transferAmmount(): Observable<any>{
    
    
    this.account = this.accountList.filter(i=> i.accountNumber== this.transactionForm.get('accountNumber').value)[0];
    let result;
    let transaction: Transaction = {
      customerId: this.account.customerId,
      accountId: this.account.id,
      transactionAmount: this.transactionForm.get('transactionAmount').value,
      transactionType:  this.transactionForm.get('transactionType').value.code,
      }
    let transLastDetails: Transaction;
    this.transactionService.getAllTransaction(this.account.customerId, this.account.id)
    .subscribe(
      data => {
        this.transactions = data;
       
         transLastDetails =this.transactions[0];
        console.log(this.transactions);
        if(this.transactionForm.get('transactionType').value.code == 'withdrawal'){
          if(this.transactions.length>0){
          if(
            transLastDetails.balance >= this.transactionForm.get('transactionAmount').value
          ){
              
               this.transactionService.transferAmmount(transaction)
              .subscribe(
                response => {
                  result= response;
                  console.log(response);
                  this.transactionForm.reset();
                  this.showCreateSuccessToast();
                },
                error => {
                  console.log(error);
                  this.transactionForm.reset();
                  this.showCreateFailToast();
                });
                return result;
          }
          
      else{
        this.showBalanceFailureToast();
        this.transactionForm.reset();
        return null;
      }
    }
    else{
      this.showBalanceFailureToast();
      this.transactionForm.reset();
      return null;
    }
          }
          else{
            this.transactionService.transferAmmount(transaction)
            .subscribe(
              response => {
                result= response;
                console.log(response);
                this.transactionForm.reset();
                this.showCreateSuccessToast();
              },
              error => {
                console.log(error);
                this.transactionForm.reset();
                this.showCreateFailToast();
              });
              return result;
          }
        
          
      },
      error => {
        console.log(error);
      });
    return null;
   
      
}

showCreateSuccessToast() {
  this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Transaction successfull',
  });
}

showCreateFailToast() {
  this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Transaction Failed',
  });
}
showBalanceFailureToast() {
  this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Insufficient withdrawal amout',
  });
}

confirmAccount(formGroup: FormGroup) {
  const { value: account } = formGroup.get('accountNumber');
  const { value: confirmAccount } = formGroup.get('confirmAccountNumber');
  return account === confirmAccount ? null : { accountNotMatch: true };
}
  onSubmit(){
    console.log(this.transactionForm);
  }

  clearTransaction(){
    this.transactionForm.reset();
    this.isValidAccount = false;   
  }

  getAllAccounts(): void{
  
    this.accountService.getAllAccounts()
      .subscribe(
        data => {
          this.accountList = data;
          console.log(this.accountList);
        },
        error => {
          console.log(error);
        });
  }

  validateAccountNumber() {
   let account: Account;
   account =  this.accountList.filter(i=> i.accountNumber== this.transactionForm.get('accountNumber').value)[0];
   if(account == null && this.transactionForm.get('accountNumber').value != null){
   this.isValidAccount= true;
   }
   else{
    this.isValidAccount= false;
   }
}
 
}
