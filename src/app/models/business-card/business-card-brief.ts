export class BusinessCardBrief
{
    id! : number;
    name : string = '';
    dateOfBirth : Date = new Date();
    email : string = '';
    phone : string = '';
    address : string = '';
    photo : string = '';
    attachtmentId : string = '';
    genderId!: number;
    genderName : string = '';
}
