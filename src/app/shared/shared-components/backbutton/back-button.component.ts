import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
import { NavigationService } from '../../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class BackButtonComponent implements OnInit {

  isHome: boolean = false;
  currentRoute!: string;
  constructor(
    public navigationService: NavigationService,
    private router: Router,
    private injector: Injector
  ) {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((event) => {
        this.currentRoute = event.url;
        if (this.currentRoute == '/') {
          this.isHome = true;
        } else {
          this.isHome = false;
        }
      });
  }
  @Input() title: string = 'عودة';
  ngOnInit(): void {
    if (this.currentRoute == '/') {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
  }

  goBack() {
  }
  
}
