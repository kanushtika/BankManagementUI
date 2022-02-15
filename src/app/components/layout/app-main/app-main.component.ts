import {
    Component,
    AfterViewInit,
    OnDestroy,
    Renderer2,
    OnInit,
} from '@angular/core';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',

    styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit {
    public menuActiveMobile: boolean;

    constructor(public app: AppComponent) {}

    ngOnInit() {}
}
