import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateGroupDto } from '../models/group/createGroup';
import { UpdateGroupDto } from '../models/group/updateGroup';
import { Observable, firstValueFrom, observable } from 'rxjs';
import { HttpClientService } from './httpClient.service';
import { GroupBriefDto } from '../models/group/groupBrief';
import { PagedList } from '../models/pagedList';
import { GroupStatisticsDto } from '../models/group/groupStatisticsSto';

@Injectable({
  providedIn: 'root',
})
export class GroupServices {
  constructor(private http: HttpClientService) {}

  getAllGroupsWithPaging(
    committeeId: string | null,
    filters: any
  ): Observable<PagedList<GroupBriefDto>> {
    return this.http.get<PagedList<GroupBriefDto>>(
      this.http.apiUrl + `/api/Group/paged`,
      {
        params: {
          PageNumber: filters.page,
          PageSize: environment.pageSize ?? '',
          SearchText: filters.searchText ?? '',
          ActivationStatus: filters.activationStatus,
          CommitteeId: committeeId ?? '',
        },
      }
    );
  }

  getAllGroups(): Observable<GroupBriefDto[]> {
    return this.http.get<GroupBriefDto[]>(this.http.apiUrl + `/api/Group`);
  }

  getGroupById(id: string): Observable<GroupBriefDto> {
    return this.http.get<GroupBriefDto>(this.http.apiUrl + `/api/Group/${id}`);
  }

  createGroup(createGroupDto: CreateGroupDto) {
    if (createGroupDto.committeeId === '') createGroupDto.committeeId = null;
    return this.http.post(
      this.http.apiUrl + `/api/Group/create`,
      createGroupDto
    );
  }

  updateGroup(updateGroupDto: UpdateGroupDto) {
    if (updateGroupDto.committeeId === '') updateGroupDto.committeeId = null;
    return this.http.post(
      this.http.apiUrl + `/api/Group/update`,
      updateGroupDto
    );
  }

  deleteGroup(id: string) {
    return this.http.post(this.http.apiUrl + `/api/Group/delete`, { Id: id });
  }

  getGroupsStatistics(
    committeeId: string | null
  ): Observable<GroupStatisticsDto> {
    return this.http.get<GroupStatisticsDto>(
      this.http.apiUrl + `/api/Group/statistics`,
      {
        params: {
          CommitteeId: committeeId ?? '',
        },
      }
    );
  }

  basic(committeeId: string): Observable<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(
      this.http.apiUrl + `/api/group/basic`,
      {
        params: {
          CommitteeId: committeeId ?? '',
        },
      }
    );
  }

  updateGroupStatus(updateGroupDto: {
    id: string;
    isActive: boolean;
  }): Observable<boolean> {
    return this.http.post<boolean>(
      this.http.apiUrl + `/api/Group/toggle-status`,
      updateGroupDto
    );
  }
}
