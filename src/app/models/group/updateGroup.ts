import { environment } from "../../../environments/environment";

export class UpdateGroupDto {
    id : string = environment.guidDefault;
    name : string = '';
    description : string = '';
    isActive: boolean = false;
    committeeId: string | null = null;
}