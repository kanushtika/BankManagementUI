import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Account } from 'src/app/model/account';
import { Customer } from 'src/app/model/customer';
import { AccountService } from 'src/app/service/account.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    accountDialogShown: Boolean;
    accountForm: FormGroup;
    customerList: Customer[] = [];
    accountList: Account[] = [];
    customer: Customer;
    isValidIdentity: Boolean;
    isValidAccount: Boolean;
    dropdownItems = [
        { name: 'Savings', code: 'Savings' },
        { name: 'Fixed', code: 'Fixed' },
    ];
    constructor(
        private accountService: AccountService,
        public customerService: CustomerService,
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAllAccounts();
        this.accountCreateForm();
        this.getAllCustomers();
    }

    closeAccountDialog() {
        this.accountDialogShown = false;
        this.accountForm.reset();
        this.isValidAccount = false;
        this.isValidIdentity = false;
    }
    accountCreateForm() {
        this.accountForm = this.formBuilder.group({
            identityCardNo: [null, Validators.required],
            customerName: [null, Validators.required],
            accountNumber: [null, Validators.required],
            accountType: [null, Validators.required],
        });
    }

    createAccount(): Observable<any> {
        let account: Account = {
            customerId: this.customer.id,
            accountNumber: this.accountForm.get('accountNumber').value,
            accountType: this.accountForm.get('accountType').value.name,
        };
        let result;
        this.accountService.createAccount(account).subscribe(
            (response) => {
                result = response;
                console.log(response);
                this.accountDialogShown = false;
                this.accountForm.reset();
                this.getAllAccounts();
                this.showCreateSuccessToast();
            },
            (error) => {
                console.log(error);
                this.showCreateFailToast();
            }
        );

        return result;
    }
    showCreateSuccessToast() {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account created successfully',
        });
    }

    showCreateFailToast() {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Account creation Failed',
        });
    }
    getAllAccounts(): void {
        this.accountService.getAllAccounts().subscribe(
            (data) => {
                this.accountList = data;
                console.log(this.accountList);
            },
            (error) => {
                console.log(error);
            }
        );
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

    createNewAccount() {
        this.accountDialogShown = true;
        this.accountForm.reset();
    }

    onSubmit() {
        console.log(this.accountForm);
    }

    onBlur() {
        debugger;
        this.customer = this.customerList.filter(
            (i) =>
                i.identityCardNo == this.accountForm.get('identityCardNo').value
        )[0];
        if (this.customer != null) {
            this.accountForm.patchValue({
                customerName: this.customer.customerName,
            });
        }

        if (
            this.customer == null &&
            this.accountForm.get('identityCardNo').value != null
        ) {
            this.isValidIdentity = true;
        } else {
            this.isValidIdentity = false;
        }
    }

    validateAccountNumber() {
        let account: Account;
        account = this.accountList.filter(
            (i) =>
                i.accountNumber == this.accountForm.get('accountNumber').value
        )[0];
        if (
            account != null &&
            this.accountForm.get('accountNumber').value != null
        ) {
            this.isValidAccount = true;
        } else {
            this.isValidAccount = false;
        }
    }
}
