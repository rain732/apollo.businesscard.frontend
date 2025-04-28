import { Pipe, PipeTransform } from '@angular/core';
import { RequestStatusBadgeColorEnum } from '../../enums/request-status-badge-color.enum';
import { RequestStatusEnum } from '../../enums/request-status.enum';

@Pipe({
  name: 'statusBadge',
  standalone: true,
})
export class StatusBadgePipe implements PipeTransform {
  transform(id: number): string {
    switch (id) {
      case RequestStatusEnum.New as number:
        return RequestStatusBadgeColorEnum.New;
      case RequestStatusEnum.Approved as number:
        return RequestStatusBadgeColorEnum.Approved;
      case RequestStatusEnum.ReferredToHighMedicalCommittee as number:
        return RequestStatusBadgeColorEnum.ReferredToHighMedicalCommittee;
      case RequestStatusEnum.ReturnToCompleteMissingItems as number:
        return RequestStatusBadgeColorEnum.ReturnToCompleteMissingItems;
      case RequestStatusEnum.ReturnedForCompletion as number:
        return RequestStatusBadgeColorEnum.ReturnedForCompletion;
      case RequestStatusEnum.UnderAudit as number:
        return RequestStatusBadgeColorEnum.UnderAudit;
      case RequestStatusEnum.UnderProcess as number:
        return RequestStatusBadgeColorEnum.UnderProcess;
      case RequestStatusEnum.UnderReview as number:
        return RequestStatusBadgeColorEnum.UnderReview;
      default:
        return '';
    }
  }
}
