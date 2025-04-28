export class BusinessCardSearchModel{
    name: string | null = null;
    dateOfBirth: string | null = null;
    email: string | null = null;
    phone: string | null = null;
    genderId: number | null = null;
    pageNumber: number = 1;
    pageSize: number = 10;
}