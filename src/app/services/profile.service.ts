import { Injectable } from '@angular/core';
import { UpdateUserDto } from '../models/user/UpdateUserDto';
import { UserDtoBrief } from '../models/user/userDto';
import { HttpClientService } from './httpClient.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClientService) {}

  getCurrentUser() {
    return this.http.get<UserDtoBrief>(this.http.apiUrl + `/api/Profile`);
  }

  updateUser(updateUserDto: UpdateUserDto) {
     return this.http.post<boolean>(this.http.apiUrl + `/api/Profile/edit`, updateUserDto);
  }
}
