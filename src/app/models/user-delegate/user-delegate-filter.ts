import { environment } from '../../../environments/environment';

export class UserDelegateFilter {
  pageNumber: number = 1;
  pageSize: number = environment.pageSize;
  isActive: boolean | null = null;
  isFirstLoad: boolean = true;
}
