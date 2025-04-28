import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BusinessCardsFilterComponent } from "../business-cards-filter/business-cards-filter.component";
import { BusinessCardsCreateComponent } from "../business-cards-create/business-cards-create.component";
import { BusinessCardsTableComponent } from "../business-cards-table/business-cards-table.component";
import { BusinessCardsStore } from '../business-cards.store';
import { BusinessCardsStatisComponent } from "../business-cards-statis/business-cards-statis.component";
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from "../../../shared/shared-components/loading/loading.component";
import { BusinessCardsDeleteComponent } from "../business-cards-delete/business-cards-delete.component";

@Component({
  selector: 'app-business-cards-index',
  standalone: true,
  imports: [BusinessCardsFilterComponent, BusinessCardsCreateComponent, BusinessCardsTableComponent, BusinessCardsStatisComponent, LoadingComponent, BusinessCardsDeleteComponent],
  templateUrl: './business-cards-index.component.html',
  styleUrl: './business-cards-index.component.css'
})
export class BusinessCardsIndexComponent implements OnInit {
  private readonly store : BusinessCardsStore = inject(BusinessCardsStore);
  private readonly cdr = inject(ChangeDetectorRef);
  protected isLoading: boolean = false;
  constructor() {
    this.store.isLoading$.subscribe(x => {
        this.isLoading = x;
    });
    this.store.triggerGetBusinessCards$.next();
    
  }
  ngOnInit(): void {
    this.cdr.detectChanges()
  }
}
