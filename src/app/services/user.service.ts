import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedList } from '../models/pagedList';
import { AddUserGroupDto } from '../models/user-group/AddUserGroupDto';
import { CreateUserDto } from '../models/user/CreateUserDto';
import { UpdatePasswordDto } from '../models/user/UpdatePasswordDto';
import { UpdateUserDto } from '../models/user/UpdateUserDto';
import { UserByPermissionBrief } from '../models/user/UserByPermissionBrief';
import { UserDtoBrief } from '../models/user/userDto';
import { UserInActiveDirectoryDto } from '../models/user/userInActiveDirectory';
import { HttpClientService } from './httpClient.service';
import { UserShortBrief } from '../models/user/user-short-brief';
import { HttpParams } from '@angular/common/http';
import { UsersStatisticsModel } from '../models/user/user-statistcs.model';
import { DownloadAttachmentBrief } from '../models/attachment/downloadAttachmentBrief';
import { AllUsersReportDto } from '../models/user/all-users-report-dto';
import { Utils } from '../shared/utils/utils';
import { UpdateAccountPasswordModel } from '../models/account/update-account-password.model';
import { UserAllowToAssignGroupDto } from '../models/user/users-allow-to-assign-group-dto';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  user: UserInActiveDirectoryDto = { name: '', email: '', userName: '' };

  constructor(private http: HttpClientService) {}

  getUsersByPermission(
    permission: string
  ): Observable<UserByPermissionBrief[]> {
    return this.http.get<UserByPermissionBrief[]>(
      this.http.apiUrl + `/api/User/getUsersByPermission`,
      {
        params: {
          Permission: permission,
        },
      }
    );
  }

  delete(id: string): Observable<void> {
    return this.http.post<void>(this.http.apiUrl + `/api/User/delete`, { id });
  }

  getUsersStatistics(committeeId: string): Observable<UsersStatisticsModel> {
    let params: HttpParams = new HttpParams().set('CommitteeId', committeeId);
    return this.http.get<UsersStatisticsModel>(
      this.http.apiUrl + `/api/User/statistics`,
      { params }
    );
  }

  getAllUsersWithPaging(
    committeeId: string,
    filters: {
      page: number;
      searchText: string | null;
      isActive: boolean | null;
      employmentNumber: string | null;
    }
  ): Observable<PagedList<UserDtoBrief>> {
    let params: HttpParams = new HttpParams()
      .set('PageNumber', filters.page)
      .set('PageSize', environment.pageSize)
      .set('CommitteeId', committeeId);

    if (!!filters.employmentNumber)
      params = params.set('employmentNumber', filters.employmentNumber);

    if (!!filters.isActive) params = params.set('isActive', filters.isActive);

    if (!!filters.searchText)
      params = params.set('searchText', filters.searchText);

    return this.http.get<PagedList<UserDtoBrief>>(
      this.http.apiUrl + `/api/User/paged`,
      { params }
    );
  }

  getAllUsers() {
    return firstValueFrom(
      this.http.get<UserDtoBrief[]>(this.http.apiUrl + `/api/User/all-users`)
    );
  }

  updateUser(updateUserDto: UpdateUserDto) {
    if (updateUserDto.committeeId === '') {
      updateUserDto.committeeId = null;
    }
    return this.http.post(this.http.apiUrl + `/api/User/update`, updateUserDto);
  }

  updateUserStatus(updateUserDto: {
    id: string;
    isActive: boolean;
  }): Observable<boolean> {
    return this.http.post<boolean>(
      this.http.apiUrl + `/api/User/toggle-status`,
      updateUserDto
    );
  }

  createUser(createUserDto: CreateUserDto) {
    if (createUserDto.committeeId === '') {
      createUserDto.committeeId = null;
    }
    return this.http.post(this.http.apiUrl + `/api/User/create`, createUserDto);
  }

  addUserGroup(addUserGroupDto: AddUserGroupDto) {
    return this.http.post(
      this.http.apiUrl + `/api/user/assign-to-group`,
      addUserGroupDto
    );
  }

  getUsersByPermissions(
    permission: string[]
  ): Observable<UserByPermissionBrief[]> {
    return this.http.get<UserByPermissionBrief[]>(
      this.http.apiUrl + `/api/User/getUsersByPermissions`,
      {
        params: {
          Permissions: permission.toString(),
        },
      }
    );
  }

  changePasswordByAdmin(updateUserPassword: UpdatePasswordDto) {
    return this.http.post(
      environment.apiUrl + `/api/User/change-password-by-admin`,
      updateUserPassword
    );
  }

  updatePassword(updateUserPassword: UpdatePasswordDto) {
    return this.http.post(
      environment.apiUrl + `/api/User/update-password`,
      updateUserPassword
    );
  }

  getActiveUsers(committeeId: string) {
    return this.http.get<UserShortBrief[]>(
      this.http.apiUrl + `/api/User/active-users`,
      {
        params: {
          CommitteeId: committeeId.toString(),
        },
      }
    );
  }

  getActiveHospitalManagers() {
    return this.http.get<UserShortBrief[]>(
      this.http.apiUrl + `/api/User/active-hospital-managers`
    );
  }

  printAllUsers(
    filters: AllUsersReportDto
  ): Observable<DownloadAttachmentBrief> {
    let params: HttpParams = new HttpParams().set(
      'ExportType',
      filters.exportType
    );
    if (!Utils.isNullOrEmpty(filters.employmentNumber))
      params = params.set('EmploymentNumber', filters.employmentNumber);
    if (!Utils.isNullOrEmpty(filters.searchText))
      params = params.set('SearchText', filters.searchText);
    if (filters.isActive != null)
      params = params.set('IsActive', filters.isActive);
    if (filters.committeeId != null)
      params = params.set('CommitteeId', filters.committeeId);
    return this.http.get<DownloadAttachmentBrief>(
      this.http.apiUrl + `/api/Report/all-users`,
      { params }
    );
  }

  changePassword(model: UpdateAccountPasswordModel): Observable<void> {
    return this.http.post<void>(
      environment.apiUrl + `/api/Profile/change-password`,
      model
    );
  }

  getAllUsersAllowedToAssign(): Observable<UserAllowToAssignGroupDto[]> {
    return this.http.get<UserAllowToAssignGroupDto[]>(
      this.http.apiUrl + `/api/User/users-allowed-assign-to-group`
    );
  }
}
