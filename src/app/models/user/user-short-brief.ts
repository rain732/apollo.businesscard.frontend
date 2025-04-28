import { environment } from "../../../environments/environment";

export class UserShortBrief {
  id: string = environment.guidDefault;
  fullName: string = '';
}
