import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlingServices } from '../../../../services/errorHandling.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog-content.component.html',
  styleUrls: ['./model-dialog-content.component.css'],
  standalone:true,
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal, NgbActiveModal,],
  imports : [CommonModule]
})
export class ModalDialogContentComponent implements OnInit {
  @Input() title: string = '';
  @Input() buttonTitle: string = '';
  @Input() modalId: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isHidden: boolean = false;
  @Input() submitButtonColor: string | null = null;
  @Output() submitEmitter = new EventEmitter<boolean>();
  @Output() closeEmitter = new EventEmitter<boolean>();
  @Input() closeButtonTitle : string ='Close';


  @ViewChild('content') content!: ElementRef;
  errors: string[] = [];
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private errorHandlingServices: ErrorHandlingServices
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = true;
    this.errorHandlingServices.getEmmiter().subscribe((data) => {
      this.errors = this.errorHandlingServices.getErrorMessage();
    });
  }

  ngOnInit(): void {
    this.errorHandlingServices.clearErrors();
  }

  open(size?: string): void {
    this.errors = [];
    this.errorHandlingServices.clearErrors();
    this.modalService.open(this.content, { size: size });
  }

  submit(): void {
    this.submitEmitter.emit(true);
  }

  close(): void {
    this.errorHandlingServices.clearErrors();
    this.errors = [];
    this.closeEmitter.emit(true);
    this.modalService.dismissAll();
  }
}
