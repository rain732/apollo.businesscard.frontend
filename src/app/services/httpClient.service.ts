import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class HttpClientService extends HttpClient{
  apiUrl ="";
  constructor(handler: HttpHandler) {
    super(handler);
    this.apiUrl = environment.apiUrl;
  }
}
