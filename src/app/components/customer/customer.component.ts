import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  
  customerDialogShown: Boolean;
  customerForm:FormGroup;
  selectedState:any;
  customer: Customer;
  customerList: Customer[] = [];
  isValidIdentity:Boolean;

  constructor(
              public customerService: CustomerService,
              private formBuilder: FormBuilder,
              private messageService: MessageService
             ) { }

  ngOnInit(): void {
   
    this.getAllCustomers();
    this.customerCreateForm();

  }

  customerCreateForm() {
    this.customerForm = this.formBuilder.group({
      customerName : [null, Validators.required],
      identityCardNo : [null, Validators.required],
      email : [null, [Validators.required, Validators.email]]
     
      

    });
  }
  createNew(){
    this.customerDialogShown = true;
  }

  closeDialog(){
    this.customerDialogShown = false;
    this.customerForm.reset();
    this.isValidIdentity = false;
  }

  createCustomer(): Observable<any>{
      let result;
       this.customerService.createCustomer(this.customerForm.value)
      .subscribe(
        response => {
          result= response;
          console.log(response);
          this.customerDialogShown = false;
          this.customerForm.reset();
          this.getAllCustomers();
          this.showCreateSuccessToast();
        },
        error => {
          console.log(error);
          this.showCreateFailToast();
        });

        return result;
  }
  showCreateSuccessToast() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Customer created successfully'});
  }

  showCreateFailToast() {
   
    this.messageService.add({severity:'error', summary:'Error', detail:'Customer creation Failed'});
  
  }
    
  getAllCustomers(): void{
  
      this.customerService.getAllCustomers()
        .subscribe(
          data => {
            this.customerList = data;
            console.log(this.customerList);
          },
          error => {
            console.log(error);
          });
    }
  

  onSubmit(){
    console.log(this.customerForm);
  }
  validateIdentityNumber() {
    let customer: Customer;
    customer =  this.customerList.filter(i=> i.identityCardNo== this.customerForm.get('identityCardNo').value)[0];
    if(customer != null && this.customerForm.get('identityCardNo').value != null){
    this.isValidIdentity= true;
    }
    else{
     this.isValidIdentity= false;
    }
 }

}
