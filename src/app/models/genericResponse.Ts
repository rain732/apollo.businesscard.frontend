export class GenericResponse<T> {
    data!: T;
    succeeded : boolean = false;
    errors : string[] = [];
    httpStatusCode : number = 0;
}