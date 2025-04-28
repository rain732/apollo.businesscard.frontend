import { environment } from "../../../environments/environment";

export class AddUserGroupDto {
    userId: string = environment.guidDefault;
    group: string | null = null;

    constructor() {}
  }
