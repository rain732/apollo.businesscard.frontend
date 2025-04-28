import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmAlertComponent } from "../../../shared/shared-components/confirm-alert/confirm-alert.component";
import { Subscription, finalize } from 'rxjs';
import { FeatherIconsEnum } from '../../../enums/feather-icons.enums';
import { SharedColors } from '../../../enums/shared-colors.enum';
import { SweetAlert2Icons } from '../../../enums/sweetAlert2-icons.enum';
import { ToastEnum } from '../../../enums/toast.enums';
import { ErrorHandlingServices } from '../../../services/errorHandling.service';
import { SuccessHandlingServices } from '../../../services/successHandiling.service';
import { BusinessCardService } from '../../../services/business-card.service';
import { BusinessCardsStore } from '../business-cards.store';

@Component({
  selector: 'app-business-cards-delete',
  standalone: true,
  imports: [ConfirmAlertComponent],
  templateUrl: './business-cards-delete.component.html',
  styleUrl: './business-cards-delete.component.css'
})
export class BusinessCardsDeleteComponent {
  private readonly store = inject(BusinessCardsStore);
  private readonly businessCardServices = inject(BusinessCardService);
  private readonly errorHandlingServices: ErrorHandlingServices = inject(
    ErrorHandlingServices
  );
  private readonly successHandlingServices: SuccessHandlingServices = inject(
    SuccessHandlingServices
  );

  private subscriptions: Subscription[] = [];

  @ViewChild('confirmAlert') confirmAlert!: ConfirmAlertComponent;
  deletedClinicId! : number;
  constructor() {
    this.subscriptions.push(
      this.store.fireDeleteModal$.subscribe( {
        next: (id) => {
          this.deletedClinicId = id;
          this.openDeleteModal();
        }        
      })
    );    
    
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  openDeleteModal() {
    this.confirmAlert.fire(
      () => this.deleteClinic(),
      'Warning',
      'Are You Sure You Want To Delete It ?',
      SweetAlert2Icons.warning,
      SharedColors.danger,
      SharedColors.gray,
      'Delete',
      true,
      false
    );
  }
  deleteClinic() {
    return this.businessCardServices
      .delete(this.deletedClinicId)
      .pipe(finalize( ()=> {
        this.store.triggerGetBusinessCards$.next();
      }))
      .subscribe({
        next: (result) => {
          this.successHandlingServices.handleNewMessages(
            ['Deleted Successfully'],
            ToastEnum.success,
            FeatherIconsEnum.checkCircle,
            'Done'
          );
        },
        error: (err) => {
          this.errorHandlingServices.clearErrors();
          this.errorHandlingServices.handleError(err?.error?.errors?.validation);
        },
      });
  }
}
