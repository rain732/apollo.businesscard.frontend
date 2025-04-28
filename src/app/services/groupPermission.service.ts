import { Injectable } from "@angular/core";
import { CreateGroupPermissionDto } from "../models/permission/createPermissionGroup";
import { HttpClientService } from "./httpClient.service";

@Injectable({
    providedIn: 'root',
  })

  export class GroupPermissionServices {

    constructor(private http : HttpClientService) {}

    createGroupPermission(createGroupPermissionDto : CreateGroupPermissionDto) {

        return this.http.post(this.http.apiUrl +`/api/GroupPermission`,createGroupPermissionDto).toPromise();
    }
  }
