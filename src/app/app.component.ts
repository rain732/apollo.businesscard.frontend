import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from "./shared/shared-components/main-menu/main-menu.component";
import { ToastrService } from 'ngx-toastr';
import { SuccessHandlingServices } from './services/successHandiling.service';
import { ToastEnum } from './enums/toast.enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Apollo.Frontend';

  toastMessage: string[] = [];
  toastcolor: string = '';
  toastIcon: string = 'circle';
  toastTitle: string = '';
  constructor(
    private sucessHandlingServices: SuccessHandlingServices,
    private toastr: ToastrService
  ) {
    this.sucessHandlingServices.getEmmiter().subscribe((data) => {
      this.toastMessage = this.sucessHandlingServices.getMessages();
      this.toastcolor = this.sucessHandlingServices.getColor();
      this.toastIcon = this.sucessHandlingServices.getIcon();
      this.toastTitle = this.sucessHandlingServices.getToastTitle();
      this.toastMessage.forEach((message) => {
        if (this.toastcolor == ToastEnum.success) {
          this.toastr.success(message, this.toastTitle);
        } else if (this.toastcolor == ToastEnum.warning) {
          this.toastr.warning(message, this.toastTitle, {
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
          });
        } else if (this.toastcolor == ToastEnum.error) {
          this.toastr.error(message, this.toastTitle, {
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
          });
        }
      });
    });
  }
}
