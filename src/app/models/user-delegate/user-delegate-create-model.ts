import { environment } from '../../../environments/environment';

export class UserDelegateCreateModel {
  delegateId: string = environment.guidDefault;
  fromDate: string = '';
    toDate?: string = '';
}
