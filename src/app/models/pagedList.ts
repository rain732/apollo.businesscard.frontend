export class PagedList<T> {
    items : T[] = []
    pageNumber : number = 0;
    totalPages: number = 0;
    totalCount : number = 0;
    hasPreviousPage : boolean = false;
    hasNextPage : boolean = false;
}