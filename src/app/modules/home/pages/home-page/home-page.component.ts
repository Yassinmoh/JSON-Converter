import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TableModule,PaginatorModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})



export class HomePageComponent implements OnInit {

  jsonForm!: FormGroup;
  jsonData: any = null;
  errorMessage: string | null = null;
  paginatedData: any[] = [];
  rows: number = 10;
  first: number = 0;
  currentPage: number = 0;
  filters: any = {};
  filteredData: any[] = [];

  _fb = inject( FormBuilder);

  ngOnInit(): void {
    this.jsonForm = this._fb.group({
      jsonInput: ['', [Validators.required,this.jsonValidator.bind(this)]]
    });

    this.jsonForm.get('jsonInput')?.valueChanges.subscribe(value => {
      try {
        this.jsonData = JSON.parse(value);
        this.errorMessage = null;
        this.filters = {};
        this.applyFilter();
      } catch (e) {
        this.jsonData = null;
        this.filteredData = [];
        this.paginatedData = [];
        this.errorMessage = 'Invalid JSON format';
      }
    });

  }

  jsonValidator(control: any) {
    try {
      JSON.parse(control.value);
      this.errorMessage = null;
      return null;
    } catch (e) {
      this.errorMessage = 'Invalid JSON format';
      return { invalidJson: true };
    }
  }

  get jsonKeys(): string[] {
    return  Object.keys(this.jsonData[0]);
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
        return item[key].toString().toLowerCase().includes(this.filters[key].toLowerCase());
      });
    });
    this.paginate({ first: 0, rows: this.rows });
  }

  clear(){
    this.filters = {};
  }
}
