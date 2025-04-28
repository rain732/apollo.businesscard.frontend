import { Component } from '@angular/core';
import Swal, { SweetAlertIcon } from "sweetalert2"

@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.css'],
  standalone:true
})
export class ConfirmAlertComponent {

  fire
    (emmiter : Function,
     title : string,
     message : string,
     iconType : SweetAlertIcon,
     confirmButtonColor : string,
     cancelButtonColor : string,
     confirmButtonText : string,
     showCancelButton : boolean,
     allowOutsideClick : boolean
     ){
    
    Swal.fire({
      title : title,
      text : message,
      icon : iconType,
      showCancelButton : showCancelButton,
      confirmButtonColor : confirmButtonColor,
      cancelButtonColor : cancelButtonColor,
      confirmButtonText : confirmButtonText,
      allowOutsideClick: allowOutsideClick,
      cancelButtonText : 'الغاء',
    }).then(result => {     
      if (result.isConfirmed) {
        emmiter();
      } 
    }
    )
  }
}
