import { environment } from '../../../environments/environment';

export class UserBasicBrief {
  id: string = environment.guidDefault;
  username: string = '';
  firstName: string = '';
  secondName: string = '';
  thirdName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  fullName: string = '';
  email: string = '';
}
