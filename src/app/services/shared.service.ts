// shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private routeIdSource = new BehaviorSubject<string>('');
  Id$ = this.routeIdSource.asObservable();

  setEntityId(routeId: string) {
    this.routeIdSource.next(routeId);
  }
}
