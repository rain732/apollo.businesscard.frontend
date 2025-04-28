import { inject, Injectable, signal } from '@angular/core';
import { Subject, BehaviorSubject, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorHandlingServices } from '../../services/errorHandling.service';
import { BusinessCardService } from '../../services/business-card.service';
import { BusinessCardBrief } from '../../models/business-card/business-card-brief';
import { BusinessCardSearchModel } from '../../models/business-card/business-card-search.model';
import { PagedList } from '../../models/pagedList';
import { ExportTypeEnum } from '../../enums/export-type-enum';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardsStore {

  private readonly businessCardServices: BusinessCardService = inject(BusinessCardService);
  private readonly errorHandlingServices: ErrorHandlingServices = inject(ErrorHandlingServices);
  private businessCardsList = signal<BusinessCardBrief[]>([] as BusinessCardBrief[]);
  private totalCount = signal(0);
  private page = signal(0);
  private totalPages = signal(0);

  private filters = signal<BusinessCardSearchModel>({
    name: null,
    dateOfBirth: null,
    email: null,
    phone: null,
    genderId: null,
    pageNumber: 1,
    pageSize: 10,
  } as BusinessCardSearchModel);

  public triggerGetBusinessCards$: Subject<void> = new Subject<void>();

  public openCreateModal$: Subject<void> = new Subject<void>();
  
  public fireDeleteModal$: Subject<number> = new Subject<number>();

  public refreshStatsistics$: Subject<void> = new Subject<void>();

  public export$: Subject<ExportTypeEnum> = new Subject<ExportTypeEnum>();

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public isFirstLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
    this.triggerGetBusinessCards$.subscribe({
      next: () => {
        this.getAllBusinessCardsWithPaging();
        this.refreshStatsistics$.next();
      },
    });
  }

  setFilters(val: BusinessCardSearchModel) {
    this.filters.set(val);
  }

  getFilters() {
    return this.filters();
  }

  setBusinessCardsList(val: BusinessCardBrief[]) {
    this.businessCardsList.set(val);
  }

  getBusinessCardsList() {
    return this.businessCardsList();
  }

  setTotalCount(val: number) {
    this.totalCount.set(val);
  }

  getTotalCount() {
    return this.totalCount();
  }

  setPage(val: number) {
    this.page.set(val);
    let filters = this.filters();
    filters.pageNumber = val;
    this.filters.set(filters);
  }

  getPage() {
    return this.page();
  }

  setTotalPages(val: number) {
    this.totalPages.set(val);
  }

  getTotalPages() {
    return this.totalPages();
  }

  private getAllBusinessCardsWithPaging(): void {
    this.isLoading$.next(true);
    this.businessCardServices.getCardsWithPagination(this.filters())
    .pipe(finalize(() => {this.isLoading$.next(false)})).subscribe({
      next: (resp : any) => {
        let result = resp.data;
        
        this.setBusinessCardsList(result.items);
        this.setPage(result.pageNumber);
        this.setTotalPages(result.totalPages);
        this.setTotalCount(result.totalCount);
        this.isLoading$.next(false);
      },
      error: (err) => {
        this.isLoading$.next(false);
        const errors = err?.error?.errors?.validation;
        if(errors){
          errors.forEach((error : any) => {
            this.errorHandlingServices.handleError(error);
          });
        }
        else{
          this.errorHandlingServices.handleError(err);
        }
      },
    });
  }

}
