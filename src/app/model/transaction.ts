export interface Transaction {
    id?: number;
    identityCardNo?:string;
    customerName?:string;
    customerId:number;
    accountId:number;
    accountNumber?: string;
    confirmAccountNumber?: string;
    transactionAmount:number;
    transactionType:string;
    balance?:number;
    transactionDate?:Date;
    
}