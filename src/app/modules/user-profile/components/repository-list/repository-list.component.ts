import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent {
  @Input() repoData: any[] = [];
  @Input() pageCount: number = 0;
  @Input() currentPage: number = 1;
  @Input() totalRepoCount: number = 0;
  @Input() itemsPerPage: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  handlePageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
