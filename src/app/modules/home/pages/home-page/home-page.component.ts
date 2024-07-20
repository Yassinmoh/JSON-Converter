import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  jsonForm!: FormGroup;
  jsonData: any = null;
  errorMessage: string | null = null;

  _fb = inject( FormBuilder);

  ngOnInit(): void {
    this.jsonForm = this._fb.group({
      jsonInput: ['', [Validators.required, this.jsonValidator.bind(this)]]
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
}
