import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AppMainComponent } from './components/layout/app-main/app-main.component';

import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent},
                    {path: 'customer', component: CustomerComponent},
                    {path: 'account', component: AccountComponent},
                    {path: 'transaction', component: TransactionComponent},
                    {path: 'transactionDetails', component: TransactionDetailsComponent},
                ]
            },

            
        ],)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
