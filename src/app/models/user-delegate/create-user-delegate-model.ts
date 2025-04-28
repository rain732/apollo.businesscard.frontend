import { environment } from '../../../environments/environment';

export class CreateUserDelegateModel {
  delegateId: string = environment.guidDefault;
  fromDate: string = '';
  toDate: string = '';
}
