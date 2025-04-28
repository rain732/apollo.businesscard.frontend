import {environment} from '../../../environments/environment';
import { GroupPermissionBriefDto } from '../permission/groupPermissionBrief';

export class GroupBriefDto{
    id : string = environment.guidDefault;
    name : string = '';
    description : string = '';
    isActive : boolean = false;
    usersCount : number = 0;
    groupPermissions : GroupPermissionBriefDto[] = [];
}
