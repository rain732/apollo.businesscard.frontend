import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClient.service';
import { Observable } from 'rxjs';
import { LookupBrief } from '../models/lookups/lookup-brief';
import { AttachmentTypesBrief } from '../models/attachment/attachmentTypesBrief';
import { FormAttachmentTypesModel } from '../models/attachment/form-attachment-types-model';
import { MissingItmsBasicModel } from '../models/missing-items/missing-items-basic.model';
import { RequestCommitteDecisionModel } from '../models/request/request-committe-decision-model';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(private http: HttpClientService) {}

  getRanks(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(this.http.apiUrl + `/api/Lookup/rank`);
  }

  getCommitteeRole(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/committee-role`
    );
  }

  getCommitteeReview(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/committee-review`
    );
  }

  getGender(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/gender`
    );
  }

  getRequestTypes(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/request-type`
    );
  }

  getTransferRequestStatus(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/transfer-request-status`
    );
  }

  getTransferRequestTypes(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/transfer-request-type`
    );
  }
  
  getRequestStatuses(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/request-status`
    );
  }

  getRequestAttachmentTypes(
    requestTypeId: number
  ): Observable<AttachmentTypesBrief[]> {
    return this.http.get<AttachmentTypesBrief[]>(
      this.http.apiUrl + `/api/Lookup/request-attachment-type`,
      {
        params: { RequestTypeId: requestTypeId },
      }
    );
  }

  getDocumentTypes(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/document-type`
    );
  }

  getReturnToWorkStatus(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/return-to-work-status`
    );
  }

  getRecommendationTypes(id: number): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/recommendation-type`,
      {
        params: {
          RequestTypeId: id,
        },
      }
    );
  }

  getCommitteeMemberRequestRecommendation(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/committee-Member-Request-Recommendation`
    );
  }

  getRapporteurDecision(requestTypeId: number): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/Rapporeur-Allowed-Actions`,
      {
        params: {
          RequestTypeId: requestTypeId ?? '',
        },
      }
    );
  }

  getSignedRecommendationFinalDecision(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/signed-recommendation-final-decision`
    );
  }

  getSendToHigherCommitteeReasons(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/send-to-higher-committee-reason`
    );
  }

  getFormAttachmentTypes(
    formTypeId: number
  ): Observable<FormAttachmentTypesModel[]> {
    return this.http.get<FormAttachmentTypesModel[]>(
      this.http.apiUrl + `/api/Lookup/form-attachment-type`,
      {
        params: { FormTypeId: formTypeId },
      }
    );
  }

  public getActiveMissingItems(): Observable<MissingItmsBasicModel[]> {
    return this.http.get<MissingItmsBasicModel[]>(
      `${this.http.apiUrl}/api/Lookup/active-missing-items`
    );
  }

  public getLetterReference(): Observable<MissingItmsBasicModel[]> {
    return this.http.get<MissingItmsBasicModel[]>(
      `${this.http.apiUrl}/api/Lookup/letter-reference`
    );
  }

  getAcceptionReason(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/acception-reason`
    );
  }

  getCities(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/cities`
    );
  }
  getFormTypes(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/form-type`
    );
  }
  getReturnToSecrateryReasons(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/return-to-secratery-reasons`
    );
  }

  getReasonsOfAppointment(): Observable<LookupBrief[]> {
    return this.http.get<LookupBrief[]>(
      this.http.apiUrl + `/api/Lookup/reasons-of-appointment`
    );
  }
}
