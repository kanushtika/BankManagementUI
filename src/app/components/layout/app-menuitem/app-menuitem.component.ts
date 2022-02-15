import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppMainComponent } from '../app-main/app-main.component';

@Component({
    selector: '[app-menuitem]',
  templateUrl: './app-menuitem.component.html',
    host: {
        '[class.active-menuitem]': 'active',
    },
   
  styleUrls: ['./app-menuitem.component.scss']
  
})
export class AppMenuitemComponent implements OnInit {

    @Input() item: any;

    @Input() index: number;

  

    @Input() parentKey: string;

    active = false;


    key: string;

    constructor(public app: AppMainComponent, public router: Router, private cd: ChangeDetectorRef) {
        

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                } else {
                    this.active = false;
                }
            });
    }

    ngOnInit() {
        if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(this.item.routerLink[0], this.item.items ? false : true);
    }

    itemClick(event: Event) {
        event.stopPropagation();
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

      
        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;
        } else {
            // activate item
            this.active = true;

            // hide overlay menus
            this.app.menuActiveMobile = false;

           
        }
    }

 
}
