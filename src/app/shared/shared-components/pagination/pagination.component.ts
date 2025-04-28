import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true,
  imports:[NgbPagination]
})
export class PaginationComponent implements OnInit {
  @Input() totalPagesNumber: number = 0;
  @Input() totalPages: number = 0;
  @Input() page: number = 1;
  @Output() pageChangeEmitter = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  handlePageChange(page: number) {
    this.pageChangeEmitter.emit(page);
  }
}
