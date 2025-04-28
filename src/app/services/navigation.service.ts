import { Router,NavigationEnd } from '@angular/router';
import { Injectable } from "@angular/core";
import { Location } from "@angular/common";

@Injectable({ providedIn: "root" })
export class NavigationService {
  public history: string[] = [];

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }
  navigateByUrl(url:string): void{
    this.router.navigateByUrl(url);
  }
  navigate(url:string[]): void{
    this.router.navigate(url);
  }
  reload(): void{
    window.location.reload();
  }
}
