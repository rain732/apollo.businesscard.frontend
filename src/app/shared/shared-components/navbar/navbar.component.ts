import {
  Component,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NgbDropdownConfig,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    RouterModule,
    LoadingComponent,
  ],
  providers: [
    NgbDropdownConfig,
    NgbDropdownModule,
    NgbDropdownModule,
    RouterModule,
    LoadingComponent,
  ],
})
export class NavbarComponent {


}
