import { Component, inject } from '@angular/core';
import { PaginationComponent } from "../../../shared/shared-components/pagination/pagination.component";
import { BusinessCardsStore } from '../business-cards.store';

@Component({
  selector: 'app-business-cards-pagination',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './business-cards-pagination.component.html',
  styleUrl: './business-cards-pagination.component.css'
})
export class BusinessCardsPaginationComponent {
  private readonly businessCardStore: BusinessCardsStore = inject(
    BusinessCardsStore
  );

  get totalCount() {
    return this.businessCardStore.getTotalCount();
  }

  get page() {
    return this.businessCardStore.getPage();
  }

  get totalPages() {
    return this.businessCardStore.getTotalPages();
  }

  protected handlePageChange(page: number) {
    this.businessCardStore.setPage(page);
    this.businessCardStore.triggerGetBusinessCards$.next()
  }
}
