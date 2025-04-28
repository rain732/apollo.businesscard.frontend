export class CreateGroupDto{
    name : string = '';
    description : string = '';
    isActive: boolean = false;
    committeeId: string | null = null;
}
