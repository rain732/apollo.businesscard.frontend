import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClient.service';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagedList';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BusinessCardBrief } from '../models/business-card/business-card-brief';
import { BusinessCardSearchModel } from '../models/business-card/business-card-search.model';
import { BusinessCardsStatisticsBrief } from '../models/business-card/business-cards-statistics-brief';
import { CreateBusinessCardModel } from '../models/business-card/create-business-card.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {

   constructor(private http: HttpClientService) {}
 
   getCardsWithPagination(
       filters: BusinessCardSearchModel
     ): Observable<PagedList<BusinessCardBrief>> {
       let params: HttpParams = new HttpParams()
         .set('PageNumber', filters.pageNumber ?? 1)
         .set('PageSize', environment.pageSize);
   
      if (!!filters.dateOfBirth)
        params = params.set('dateOfBirth', filters.dateOfBirth);
  
      if (!!filters.email) params = params.set('email', filters.email);
  
      if (!!filters.genderId)
        params = params.set('genderId', filters.genderId);

      if (!!filters.name)
      params = params.set('name', filters.name);

      if (!!filters.phone)
      params = params.set('phone', filters.phone);
  
       return this.http.get<PagedList<BusinessCardBrief>>(
         this.http.apiUrl + `/api/BusinessCards/paged`,
         { params }
       );
     }

  getBusinessCardsStatistics() : Observable<BusinessCardsStatisticsBrief>{
    return this.http.get<BusinessCardsStatisticsBrief>(
      this.http.apiUrl + `/api/BusinessCards/statistics`
    )
  }

  createBusinessCard(form: CreateBusinessCardModel) : Observable<void>{
    return this.http.post<void>(
      this.http.apiUrl + `/api/BusinessCards`,
      form
    )
  }

  delete(id : number) {
    return this.http.delete(this.http.apiUrl + `/api/BusinessCards/${id}`);
  }

}
