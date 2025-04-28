import { environment } from '../../../environments/environment';

export class UserDelegateModel {
  id: string = environment.guidDefault;
  delegateFullName: string = '';
  delegateId: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  isActive: boolean = false;
  created: Date = new Date();
}
