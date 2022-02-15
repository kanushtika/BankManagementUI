import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../app-main/app-main.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  model: any[];

  constructor(public appMain: AppMainComponent) { }

  ngOnInit() {
      this.model = [
          {
              label: 'Home',
              items:[
                  {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/']},
                  {label: 'Customer', icon: 'pi pi-fw pi-user', routerLink: ['/customer']},
                  {label: 'Account', icon: 'pi pi-fw pi-credit-card', routerLink: ['/account']},
                  {label: 'Transaction', icon: 'pi pi-fw pi-dollar', routerLink: ['/transaction']},
                  {label: 'View Transaction', icon: 'pi pi-fw pi-dollar', routerLink: ['/transactionDetails']}
              ]
          },
          
         
         
        
        
      ];
  }

  onKeydown(event: KeyboardEvent) {
      const nodeElement = (<HTMLDivElement> event.target);
      if (event.code === 'Enter' || event.code === 'Space') {
          nodeElement.click();
          event.preventDefault();
      }
  }
}
