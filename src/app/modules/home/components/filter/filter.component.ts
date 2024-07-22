import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() jsonKeys: string[] = [];
  @Input() filters: any = {};
  @Output() applyFilter = new EventEmitter<void>();
  @Output() clearFilters = new EventEmitter<void>();

  onFilter() {
    this.applyFilter.emit();
  }

  clear() {
    this.clearFilters.emit();
  }
}
