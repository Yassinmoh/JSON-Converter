import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { JsonFormComponent } from '../../components/json-form/json-form.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { TableComponent } from '../../components/table/table.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TableModule,PaginatorModule,JsonFormComponent,FilterComponent,TableComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})


export class HomePageComponent implements OnInit {

  jsonData: any = null;
  errorMessage: string | null = null;
  paginatedData: any[] = [];
  rows: number = 10;
  first: number = 0;
  currentPage: number = 0;
  filters: any = {};
  filteredData: any[] = [];

  ngOnInit(): void {}

  onJsonParsed(jsonData: any) {
    if (jsonData) {
      this.jsonData = jsonData;
      this.filters = {};
      this.applyFilter();
    } else {
      this.jsonData = null;
      this.filteredData = [];
      this.paginatedData = [];
    }
  }

  //Get JSON data Keys:
  get jsonKeys(): string[] {
    return this.jsonData ? Object.keys(this.jsonData[0]) : [];
  }

  paginate(event: any) {
    this.currentPage = event.first / event.rows;
    this.rows = event.rows;
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.paginatedData = this.filteredData.slice(start, end);
  }

  applyFilter() {
    this.filteredData = this.jsonData.filter((item: any) => {
      return Object.keys(this.filters).every(key => {
        return item[key].toString().toLowerCase().includes(this.filters[key]?.toLowerCase() || '');
      });
    });
    this.paginate({ first: 0, rows: this.rows });
  }

  clearFilters() {
    this.filters = {};
  }
}
