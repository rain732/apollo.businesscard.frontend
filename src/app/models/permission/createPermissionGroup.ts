import { environment } from "../../../environments/environment";

export class CreateGroupPermissionDto {

    groupId : string = environment.guidDefault;
    permissionsIds : number[] = [];
    
}