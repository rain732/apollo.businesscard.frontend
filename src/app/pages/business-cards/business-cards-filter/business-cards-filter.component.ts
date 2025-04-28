import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BusinessCardsStore } from '../business-cards.store';
import { FormsModule } from '@angular/forms';
import { BusinessCardSearchModel } from '../../../models/business-card/business-card-search.model';
import { GenderEnum } from '../../../enums/gender.enum';
import { EmailDirective } from '../../../shared/directives/email.directive';
import { NumberOnlyDirective } from '../../../shared/directives/numbers-only.directive';
import { ArabicWithSpacesDirective } from '../../../shared/directives/arabic-with-spaces.directive';
import { ExportTypeEnum } from '../../../enums/export-type-enum';

@Component({
  selector: 'app-business-cards-filter',
  standalone: true,
  imports: [
    FormsModule,
    EmailDirective,
    NumberOnlyDirective,
    ArabicWithSpacesDirective
  ],
  templateUrl: './business-cards-filter.component.html',
  styleUrl: './business-cards-filter.component.css'
})
export class BusinessCardsFilterComponent {
  private readonly store : BusinessCardsStore = inject(BusinessCardsStore);

  protected genderEnum: typeof GenderEnum = GenderEnum;
  protected exportEnum: typeof ExportTypeEnum = ExportTypeEnum;
  protected filters : BusinessCardSearchModel = {
    name:  null,
    dateOfBirth:  null,
    email:  null,
    phone:  null,
    genderId: null,
    pageNumber: 1,
    pageSize: 10
  };

  protected handleGenderSelected(event: any) {
    this.filters.genderId = event.target.value;
  }

  protected handleSearch(): void {    
    this.store.setFilters(this.filters);
    this.store.triggerGetBusinessCards$.next();
    this.store.isFirstLoad$.next(false);
  }

  protected onReset(): void {
    this.store.isFirstLoad$.next(true);
    this.filters = {
      name:  null,
      dateOfBirth:  null,
      email:  null,
      phone:  null,
      genderId: null,
      pageNumber: 1,
      pageSize: 10
    };
    this.store.setFilters(this.filters);
    this.store.triggerGetBusinessCards$.next();
  }

  protected handleCreateBusinessCardModalOpen(): void {
    this.store.openCreateModal$.next();
  }

  protected exportTable(type: ExportTypeEnum){
    this.store.export$.next(type);
  }
  
}
