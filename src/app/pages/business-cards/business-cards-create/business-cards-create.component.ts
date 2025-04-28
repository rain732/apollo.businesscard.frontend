import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BusinessCardsStore } from '../business-cards.store';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, finalize } from 'rxjs';
import { FeatherIconsEnum } from '../../../enums/feather-icons.enums';
import { ToastEnum } from '../../../enums/toast.enums';
import { ErrorHandlingServices } from '../../../services/errorHandling.service';
import { SuccessHandlingServices } from '../../../services/successHandiling.service';
import { ArabicOnlyDirective } from '../../../shared/directives/arabic-only.directive';
import { ArabicWithSpacesDirective } from '../../../shared/directives/arabic-with-spaces.directive';
import { ModalFormDialogContentComponent } from '../../../shared/shared-components/dialog/modal-form-dialog-content/modal-form-dialog-content.component';
import { ModalDialogContentComponent } from '../../../shared/shared-components/dialog/model-dialog-content/model-dialog-content.component';
import { BusinessCardService } from '../../../services/business-card.service';
import { FileUploadComponent } from "../../../shared/shared-components/file-upload/file-upload.component";
import { AttachmentTypesEnum } from '../../../enums/attachment-types';

@Component({
  selector: 'app-business-cards-create',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ArabicOnlyDirective,
    ModalDialogContentComponent,
    FileUploadComponent
],
  templateUrl: './business-cards-create.component.html',
  styleUrl: './business-cards-create.component.css'
})
export class BusinessCardsCreateComponent implements OnInit, OnDestroy {
  private readonly store : BusinessCardsStore = inject(BusinessCardsStore);
  private readonly fb = inject(FormBuilder);
  private readonly businessCardServices = inject(BusinessCardService);
  private readonly errorHandlingServices: ErrorHandlingServices = inject(
    ErrorHandlingServices
  );

  private readonly successHandlingServices: SuccessHandlingServices = inject(
    SuccessHandlingServices
  );
  @ViewChild('businessCardModal')
    createClinicModalDialog!: ModalFormDialogContentComponent;
  @ViewChild('confirmAlert') 
    confirmAlert: any;
  @ViewChild('fileUpload') 
    fileUpload!: FileUploadComponent;

  private subscriptions: Subscription[] = [];
  businessCardModalTitle: string = "Add New Card";
  modalBttonTitle: string = "Add";
  businessCardForm!: FormGroup;
  isSubmitted = false;
  errors: string[] = [];
  previewData: any[] = [];
  attachmentTypeEnum: typeof AttachmentTypesEnum = AttachmentTypesEnum;
  
  constructor() {
    this.subscriptions.push(
      this.store.openCreateModal$.subscribe(() => {
        this.businessCardForm.reset();
        this.businessCardForm.updateValueAndValidity();
        this.setForm();
        this.isSubmitted = false;
        this.createClinicModalDialog.open();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {    
    this.setForm();
  }

  protected get nameControl() {
    return this.businessCardForm.controls['name'];
  }

  protected get emailControl() {
    return this.businessCardForm.controls['email'];
  }

  protected get phoneControl() {
    return this.businessCardForm.controls['phone'];
  }

  protected get dobControl() {
    return this.businessCardForm.controls['dateOfBirth'];
  }

  protected get addressControl() {
    return this.businessCardForm.controls['address'];
  }
  
  protected get genderControl() {
    return this.businessCardForm.controls['gender'];
  }

  protected get photoControl() {
    return this.businessCardForm.controls['photo'];
  }

  private setForm(): void {
    this.businessCardForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.maxLength(100)]],
        dateOfBirth: [null, [Validators.required]],
        address: [null, [Validators.required, Validators.maxLength(100)]],
        email: [null, [Validators.required, Validators.maxLength(50)]],
        phone: [null, [Validators.required, Validators.maxLength(10)]],
        gender: [null, Validators.required],
        photo: [null],
      }
    );
  }

  protected onEmittedNewFile(file: any): void {
    if (!file){
      this.businessCardForm.reset();
      this.businessCardForm.updateValueAndValidity();
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;

      if (file.name.endsWith('.csv')) {
        this.parseCsv(content);
      } else if (file.name.endsWith('.xml')) {
        this.parseXml(content);
      } else {
        this.successHandlingServices.handleNewMessages(
          ['Invalid file type!'],
          ToastEnum.warning,
          FeatherIconsEnum.check,
          'Warning'
        );
      }
    };
    reader.readAsText(file);

    if(this.fileUpload)
      this.fileUpload.removeUpload();
  }

  private parseCsv(content: string) {
    const lines = content.split('\n').map(l => l.trim()).filter(l => l.length);
    if (lines.length < 2) {
      this.previewData = [];
      return;
    }
  
    const headers = lines[0].split(',').map(h => h.trim());
    const values = lines[1].split(',').map(v => v.trim());
    this.setFormValues({
      name: values[headers.indexOf('Name')],
      gender: values[headers.indexOf('Gender')],
      dob: values[headers.indexOf('Date of Birth')],
      email: values[headers.indexOf('Email')],
      phone: values[headers.indexOf('Phone')],
      address: values[headers.indexOf('Address')],
      photo: values[headers.indexOf('Photo')] || null
    })
    this.previewData = [{
      name: values[headers.indexOf('Name')] || '',
      gender: values[headers.indexOf('Gender')] || '',
      dob: values[headers.indexOf('Date of Birth')] || '',
      email: values[headers.indexOf('Email')] || '',
      phone: values[headers.indexOf('Phone')] || '',
      address: values[headers.indexOf('Address')] || '',
      photo: values[headers.indexOf('Photo')] || null
    }];
  }

  private parseXml(content: string) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(content, "application/xml");
    const items = xml.getElementsByTagName('BusinessCard');
  
    if (items.length === 0) {
      this.previewData = [];
      return;
    }
  
    const el = items[0]; // Only take the first BusinessCard
    this.setFormValues({
      name: el.getElementsByTagName('Name')[0]?.textContent ?? '',
      gender: el.getElementsByTagName('Gender')[0]?.textContent ?? '',
      dob: el.getElementsByTagName('DateOfBirth')[0]?.textContent ?? '',
      email: el.getElementsByTagName('Email')[0]?.textContent ?? '',
      phone: el.getElementsByTagName('Phone')[0]?.textContent ?? '',
      address: el.getElementsByTagName('Address')[0]?.textContent ?? '',
      photo: el.getElementsByTagName('Photo')[0]?.textContent ?? null
    })
    this.previewData = [{
      name: el.getElementsByTagName('Name')[0]?.textContent?.trim() || '',
      gender: el.getElementsByTagName('Gender')[0]?.textContent?.trim() || '',
      dob: el.getElementsByTagName('DateOfBirth')[0]?.textContent?.trim() || '',
      email: el.getElementsByTagName('Email')[0]?.textContent?.trim() || '',
      phone: el.getElementsByTagName('Phone')[0]?.textContent?.trim() || '',
      address: el.getElementsByTagName('Address')[0]?.textContent?.trim() || '',
      photo: el.getElementsByTagName('Photo')[0]?.textContent?.trim() || null
    }];
  }
  
  private setFormValues(values : 
    {
      name: string,
      gender: string,
      dob: string,
      email: string,
      phone:string,
      address: string,
      photo: string | null,
    }
  ){
    this.nameControl.setValue(values.name);
    this.genderControl.setValue(values.gender);
    this.dobControl.setValue(values.dob);
    this.emailControl.setValue(values.email);
    this.phoneControl.setValue(values.phone);
    this.addressControl.setValue(values.address);
    this.photoControl.setValue(values.photo);
    this.businessCardForm.updateValueAndValidity();
    
  }

  protected handleModalSubmit(): void {
    this.isSubmitted = true;
    if (this.businessCardForm.invalid){
      setTimeout(() => {
        this.fileUpload.removeUpload();
        this.businessCardForm.reset();
        this.businessCardForm.updateValueAndValidity();
        this.successHandlingServices.handleNewMessages(
          ['Please attach new file with fixed data'],
          ToastEnum.error,
          FeatherIconsEnum.check,
          'Error'
        );
      }, 1000);
      return;
    } 
    this.store.isLoading$.next(true);
    this.businessCardServices.createBusinessCard(this.businessCardForm.value)
    .pipe(finalize(() => 
      {
        this.store.isLoading$.next(false);
        if(this.fileUpload)
          this.fileUpload.removeUpload();
      }))
    .subscribe({
      next: () => {
        this.store.triggerGetBusinessCards$.next();
        this.createClinicModalDialog.close();
        this.successHandlingServices.handleNewMessages(
          ['Business Card Added Successfully'],
          ToastEnum.success,
          FeatherIconsEnum.checkCircle,
          'Done'
        );
      },
      error: (err) => {
        this.errors = err?.error?.errors?.validation;
        this.errorHandlingServices.handleError(this.errors)
      },
    });
  }

  protected handleModalClose(): void {
    if(this.fileUpload)
      this.fileUpload.removeUpload();
    this.businessCardForm.reset();
    this.businessCardForm.updateValueAndValidity();
    this.isSubmitted = false;
  }

   // private parseXml(content: string) {
  //   const parser = new DOMParser();
  //   const xml = parser.parseFromString(content, "application/xml");
  //   const items = xml.getElementsByTagName('BusinessCard');
  
  //   this.previewData = [];
  //   for (let i = 0; i < items.length; i++) {
  //     const el = items[i];
  //     this.previewData.push({
  //       name: el.getElementsByTagName('Name')[0]?.textContent ?? '',
  //       gender: el.getElementsByTagName('Gender')[0]?.textContent ?? '',
  //       dob: el.getElementsByTagName('DateOfBirth')[0]?.textContent ?? '',
  //       email: el.getElementsByTagName('Email')[0]?.textContent ?? '',
  //       phone: el.getElementsByTagName('Phone')[0]?.textContent ?? '',
  //       address: el.getElementsByTagName('Address')[0]?.textContent ?? '',
  //       photo: el.getElementsByTagName('Photo')[0]?.textContent ?? null
  //     });
  //   }
  // }

    // private parseCsv(content: string) {
  //   const lines = content.split('\n').map(l => l.trim()).filter(l => l.length);
  //   const headers = lines[0].split(',').map(h => h.trim());
    
  //   this.previewData = lines.slice(1).map(line => {
  //     const values = line.split(',').map(v => v.trim());
  //     return {
  //       name: values[headers.indexOf('Name')],
  //       gender: values[headers.indexOf('Gender')],
  //       dob: values[headers.indexOf('Date of Birth')],
  //       email: values[headers.indexOf('Email')],
  //       phone: values[headers.indexOf('Phone')],
  //       address: values[headers.indexOf('Address')],
  //       photo: values[headers.indexOf('Photo')] || null
  //     };
  //   });
  // }

}