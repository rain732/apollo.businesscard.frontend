import { GroupBriefDto } from '../group/groupBrief';

export class UserGroupDto {
  id: number = 0;
  userId: string = '';
  groupId: string = '';
  group: GroupBriefDto = new GroupBriefDto();
}
