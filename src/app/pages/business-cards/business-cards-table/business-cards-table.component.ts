import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BusinessCardsStore } from '../business-cards.store';
import { BusinessCardsPaginationComponent } from "../business-cards-pagination/business-cards-pagination.component";
import { ConfirmAlertComponent } from '../../../shared/shared-components/confirm-alert/confirm-alert.component';
import { SuccessHandlingServices } from '../../../services/successHandiling.service';
import { ErrorHandlingServices } from '../../../services/errorHandling.service';
import { ExportTypeEnum } from '../../../enums/export-type-enum';
import { FormatDatePipe } from '../../../shared/pipes/format-date.pipe';

@Component({
  selector: 'app-business-cards-table',
  standalone: true,
  imports: [
    BusinessCardsPaginationComponent,
    FormatDatePipe
  ],
  templateUrl: './business-cards-table.component.html',
  styleUrl: './business-cards-table.component.css'
})
export class BusinessCardsTableComponent {

  private readonly store : BusinessCardsStore = inject(BusinessCardsStore);

  private readonly successHandlingService: SuccessHandlingServices = inject(
    SuccessHandlingServices
  );
  private readonly errorHandlingServices: ErrorHandlingServices = inject(
    ErrorHandlingServices
  );
  private readonly cdr : ChangeDetectorRef = inject(ChangeDetectorRef);

  isFirstLoad: boolean = true;
  @ViewChild('alert') alert!: ConfirmAlertComponent;
  @ViewChild('tableToExport') tableToExport!: ElementRef;
  

  constructor() {
    this.store.isFirstLoad$.subscribe({
      next: (result) => {
        this.isFirstLoad = result;
      }
    });
    this.store.export$.subscribe(x => 
    {
      if(x == ExportTypeEnum.XML){
        this.exportTableToXML()
      }
      if(x == ExportTypeEnum.Excel){
        this.exportTableToCSV();
      }
    }
    )
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  get getBusinessCards() {
    return this.store.getBusinessCardsList();
  }

  protected handleDeleteEvent(id: number): void {
    this.store.fireDeleteModal$.next(id);
  }

  exportTableToCSV() {
    let csv = '';
    const rows = this.tableToExport.nativeElement.querySelectorAll('tr');
    
    rows.forEach((row: HTMLTableRowElement) => {
      const cols = row.querySelectorAll('td, th');
      const rowValues = Array.from(cols).map((col: any) => `"${col.innerText}"`);
      csv += rowValues.join(',') + '\r\n';
    });

    // Create Blob and download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-cards.csv';
    a.click();
    
    window.URL.revokeObjectURL(url);
  }

  exportTableToXML() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<Rows>\n';
    const rows = this.tableToExport.nativeElement.querySelectorAll('tbody tr');
  
    rows.forEach((row: HTMLTableRowElement) => {
      const cols = row.querySelectorAll('td');
      xml += '  <Row>\n';
      cols.forEach((col: any, index: number) => {
        xml += `    <Col${index + 1}>${col.innerText}</Col${index + 1}>\n`;
      });
      xml += '  </Row>\n';
    });
  
    xml += '</Rows>';
  
    // Create Blob and download
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-data.xml';
    a.click();
  
    window.URL.revokeObjectURL(url);
  }
}
