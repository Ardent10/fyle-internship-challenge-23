// repository-list.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  @Input() repoData: any[] = [];
  @Input() currentPage!: number;
  @Input() totalRepoCount!: number;
  @Input() itemsPerPage!: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pageCount: number = 0;

  ngOnInit(): void {
    this.pageCount = Math.ceil(this.totalRepoCount / this.itemsPerPage);
  }

  handlePageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
