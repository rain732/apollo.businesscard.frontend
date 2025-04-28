import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class DataPassService {
    datePickerValue = new Subject<any>();
}