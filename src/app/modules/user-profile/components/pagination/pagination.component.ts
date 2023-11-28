// pagination.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pageCount!: number ;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

 
  goToPage(pageNo: number): void {
    if (
      pageNo >= 1 &&
      pageNo <= this.pageCount &&
      pageNo !== this.currentPage
    ) {
      this.pageChange.emit(pageNo);
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.pageCount; i++) {
      pages.push(i);
    }
    return pages;
  }
}
