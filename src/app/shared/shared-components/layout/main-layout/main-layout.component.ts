import { Component, OnDestroy } from '@angular/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { FooterComponent } from '../../footer/footer.component';
import { MainMenuComponent } from '../../main-menu/main-menu.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ScrollUpButtonComponent } from '../../scroll-up-button/scroll-up-button.component';
import { SiteMapComponent } from '../../site-map/site-map.component';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  standalone: true,
  imports: [
    NavbarComponent,
    MainMenuComponent,
    SiteMapComponent,
    FooterComponent,
    ScrollUpButtonComponent,
    RouterModule,
    NgbDropdownModule,
  ],
})
export class MainLayoutComponent {
  private subscriptions: Subscription[] = [];
  private alertVisible = false;

  constructor() {}
}
