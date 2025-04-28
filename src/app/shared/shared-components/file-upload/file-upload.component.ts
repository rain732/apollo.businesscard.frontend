import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AttachmentTypesEnum } from '../../../enums/attachment-types';
import { FeatherIconsEnum } from '../../../enums/feather-icons.enums';
import { ToastEnum } from '../../../enums/toast.enums';
import { ErrorHandlingServices } from '../../../services/errorHandling.service';
import { SuccessHandlingServices } from '../../../services/successHandiling.service';
// import { FeatherModule } from 'angular-feather';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '../../../modules/icons/icons.module';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  imports: [
    // FeatherModule,
    NgbTooltip,
    CommonModule,
    NgIf,
    NgbTooltipModule,
    IconsModule,
  ],
  standalone: true,
})
export class FileUploadComponent implements OnInit {
  @ViewChild('myFile') myFile!: ElementRef;
  @Input() fileType: AttachmentTypesEnum[] = [AttachmentTypesEnum.pdf];
  @Input() fileTypeToShowMsg: string[] = [];
  @Output() fileChangedEmitter = new EventEmitter<any>();
  @Input() file: any;

  constructor(
    private errorHandlingServices: ErrorHandlingServices,
    private successHandlingServices: SuccessHandlingServices
  ) {}

  ngOnInit(): void {}

  fileUploaded(event: any): void {
    const file = event.target.files[0];
    if (!this.fileType.includes(file.type)) {
      let errMsg = 'File type must be one of mentioned types';

      this.successHandlingServices.handleNewMessages(
        [errMsg],
        ToastEnum.error,
        FeatherIconsEnum.checkCircle,
        'Error'
      );
      return;
    }

    if (file.size > 1*1024*1024) {
      this.errorHandlingServices.handleCustomErrors([
        `File size should be ${1*1024*1024} MB size max`,
      ]);
      this.successHandlingServices.handleNewMessages(
        [`File size should be ${1*1024*1024} MB size max`],
        ToastEnum.warning,
        FeatherIconsEnum.alertCircle,
        'Warning'
      );
      this.myFile.nativeElement.value = '';
      return;
    }
    this.file = file;
    this.fileChangedEmitter.emit(this.file);
    // Clear the input
    event.target.value = null;
  }

  removeUpload(): void {
    this.file = null;
    this.fileChangedEmitter.emit(null);
  }
}
