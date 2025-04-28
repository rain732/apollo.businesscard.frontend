import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Roles } from '../../../enums/roles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class MainMenuComponent implements OnInit, AfterViewInit, AfterViewChecked {
  roles: string[] = [];
  rolesEnum: typeof Roles = Roles;

  constructor(
    public router: Router,
    private cdr: ChangeDetectorRef

  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {

    this.cdr.detectChanges();
  }

  getRoute(str: string) {
    return this.router.url == str;
  }
}
