import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,TableModule,PaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() jsonKeys: string[] = [];
  @Input() paginatedData: any[] = [];
  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Output() paginate = new EventEmitter<any>();

  onPaginate(event: any) {
    this.paginate.emit(event);
  }
}
