import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DownloadAttachmentBrief } from '../models/attachment/downloadAttachmentBrief';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/attachment`;

  constructor() {}

  download(id: string): Observable<DownloadAttachmentBrief> {
    return this.http.get<DownloadAttachmentBrief>(this.apiUrl + `/download`, {
      params: {
        id,
      },
    });
  }
}
