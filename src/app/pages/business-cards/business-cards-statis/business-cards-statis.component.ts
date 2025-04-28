import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusinessCardsStore } from '../business-cards.store';
import { BusinessCardService } from '../../../services/business-card.service';
import { BusinessCardsStatisticsBrief } from '../../../models/business-card/business-cards-statistics-brief';

@Component({
  selector: 'app-business-cards-statis',
  standalone: true,
  imports: [],
  templateUrl: './business-cards-statis.component.html',
  styleUrl: './business-cards-statis.component.css'
})
export class BusinessCardsStatisComponent {
private readonly store : BusinessCardsStore = inject(BusinessCardsStore);

  private readonly clinicsServices: BusinessCardService = inject(BusinessCardService);

  private subsrciptions: Subscription[] = [];

  protected data: BusinessCardsStatisticsBrief = {
    total: 0,
  };

  constructor() {
    this.subsrciptions.push(
      this.store.refreshStatsistics$.subscribe(
        () => 
          {
            this.getClinicsStatistics()
          }
        )
    );
  }

  ngOnInit(): void {
    this.getClinicsStatistics();
  }

  ngOnDestroy(): void {
    this.subsrciptions.forEach((sub) => sub.unsubscribe());
  }

  private getClinicsStatistics(): void {
    this.subsrciptions.push(
      this.clinicsServices
        .getBusinessCardsStatistics()
        .subscribe({
          next: (data: any) => {
            this.data = data.data;
          },
          error: (err) => {},
        })
    );
  }
}
