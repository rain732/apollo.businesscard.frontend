import { EventEmitter, Injectable } from '@angular/core';
import { FeatherIconsEnum } from '../enums/feather-icons.enums';
import { ToastEnum } from '../enums/toast.enums';
import { SuccessHandlingServices } from './successHandiling.service';
import { Utils } from '../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingServices {
  message: string[] = [];
  emitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private successHandlingServices: SuccessHandlingServices) {}

  handleError(error: any) {
    this.message = [];
    if (error.status == 0) {
      this.successHandlingServices.handleNewMessages(
        ['Error in Server'],
        ToastEnum.error,
        FeatherIconsEnum.alertCircle,
        'Error'
      );
    }
    else if (error.status >= 500 && error.status < 600) {
      this.message.push('Error in Server');
      this.emitter.emit(true);
    } else {
      if(Utils.isNullOrEmpty(error) || error.error?.errors?.validation){
        error.error?.errors?.validation.forEach((element: string) => {
          this.message.push(element);
          this.successHandlingServices.handleNewMessages(
            this.message,
            ToastEnum.error,
            FeatherIconsEnum.checkCircle,
            'Error'
          );
        });
      }else{
        this.successHandlingServices.handleNewMessages(
          error,
          ToastEnum.error,
          FeatherIconsEnum.checkCircle,
          'Error'
        );
      }
      
      this.emitter.emit(true);
    }
  }

  handleCustomErrors(errors: string[]) {
    this.message = errors;
    this.emitter.emit(true);
  }

  getErrorMessage(): string[] {
    return this.message;
  }

  getEmmiter() {
    return this.emitter;
  }

  clearErrors() {
    this.message = [];
    this.emitter.emit(true);
  }
}
