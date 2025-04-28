export interface UserSearchFilterModel {
  page: number;
  searchText: string | null;
  isActive: boolean | null;
  employmentNumber: string | null;
  isFirstLoad: boolean | null;
}
