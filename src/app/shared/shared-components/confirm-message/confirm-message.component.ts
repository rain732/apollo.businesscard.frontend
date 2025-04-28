
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

  @Component({
    selector: 'app-confirm-message',
    templateUrl: './confirm-message.component.html',
    styleUrls: ['./confirm-message.component.css'],
  	providers: [NgbModalConfig, NgbModal, NgbActiveModal],
    standalone : true,
  })

export class ConfirmMessageComponent {

  @Input() title : string = '';
  @Input() buttonTitle : string = '';
  @Input() modalId : string = '';
  @Output() submitEmitter = new EventEmitter<boolean>();
  @ViewChild('confirm') content!: ElementRef;

	constructor(config: NgbModalConfig, private modalService: NgbModal, public activeModal: NgbActiveModal) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
	  config.keyboard = false;
	}

	open() {

		this.modalService.open(this.content);

	}

  submit(){

        this.submitEmitter.emit(true);
        this.modalService.dismissAll();

      }
}

