import { environment } from "../../../environments/environment";
import { PermissionBriefDto } from "./permissionBrief";

export class GroupPermissionBriefDto{
    id : number = 0;
    groupId : string = environment.guidDefault;
    permissionId : number = 0;
    permission: PermissionBriefDto = new PermissionBriefDto();  
}
