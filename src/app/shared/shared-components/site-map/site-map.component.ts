import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
import { BackButtonComponent } from '../backbutton/back-button.component';
import { CommonModule } from '@angular/common';

export interface IBreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css'],
  standalone : true,
  imports : [BackButtonComponent, CommonModule]
})
export class SiteMapComponent implements OnInit {
  // public breadcrumbs: IBreadCrumb[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(() => {
    //     this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    //   });
  }

  // buildBreadCrumb(
  //   route: ActivatedRoute,
  //   url: string = '',
  //   breadcrumbs: IBreadCrumb[] = []
  // ): IBreadCrumb[] {
  //   let label =
  //     route.routeConfig && route.routeConfig.data
  //       ? route.routeConfig.data['breadcrumb']
  //       : '';
  //   let parentTitle =
  //     route.routeConfig && route.routeConfig.data
  //       ? route.routeConfig.data['parentTitle']
  //       : '';
  //   let path =
  //     route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

  //   const nextUrl = path ? `${url}/${path}` : url;

  //   const breadcrumb: IBreadCrumb = {
  //     label: label,
  //     url: nextUrl,
  //   };

  //   const parentBreadCrumb: IBreadCrumb = {
  //     label: parentTitle,
  //     url: nextUrl,
  //   };

  //   let newBreadcrumbs = parentBreadCrumb.label
  //     ? [...breadcrumbs, parentBreadCrumb]
  //     : [...breadcrumbs];

  //   newBreadcrumbs = breadcrumb.label
  //     ? [...newBreadcrumbs, breadcrumb]
  //     : [...newBreadcrumbs];

  //   if (route.firstChild) {
  //     return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
  //   }
  //   return newBreadcrumbs;
  // }
  // navigate(url: string) {
  //   if (!url.includes(':id')) {
  //     this.router.navigate([url]);
  //   }
  // }
}
