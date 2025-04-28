import { environment } from "../../../environments/environment";

export class UpdateUserStatusDto {
  id: string = environment.guidDefault;
  isActive: boolean | null = null;
  constructor() {}
}
