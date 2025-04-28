import { AuthServices } from './auth/auth.services';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PagedList } from '../models/pagedList';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NotificationBrief } from '../models/notification/NotificationsBrief';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private http: HttpClient = inject(HttpClient);
  private readonly authServices = inject(AuthServices);
  public notificationCountReceived: Subject<number> = new Subject<number>();

  constructor() {
  }

  // api crud
  public getAllNotifications(filters: any) {
    return this.http.get<PagedList<NotificationBrief>>(
      environment.apiUrl + `/api/Notificiations/all-notifications`,
      {
        params: {
          PageNumber: filters.page,
          PageSize: filters.pageSize ?? environment.pageSize,
          NewOnly: filters.newOnly ?? '',
        },
      }
    );
  }

  public getNewNotificationsCount() {
    return this.http.get<number>(
      environment.apiUrl + `/api/Notificiations/unseen-count`
    );
  }

  public updateNotificationStatus(id?: number) {
    return this.http.post(environment.apiUrl + `/api/Notificiations`, { id });
  }

  public getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }

  public setRefresh(value: boolean): void {
    this.refresh.next(value);
  }
}
