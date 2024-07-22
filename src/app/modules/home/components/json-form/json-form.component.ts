import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-json-form',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './json-form.component.html',
  styleUrl: './json-form.component.scss'
})
export class JsonFormComponent implements OnInit {
  jsonForm!: FormGroup;
  errorMessage: string | null = null;

  @Output() jsonParsed = new EventEmitter<any>();
  _fb = inject(FormBuilder)

  ngOnInit(): void {
    this.jsonForm = this._fb.group({
      jsonInput: ['', [Validators.required, this.jsonValidator.bind(this)]]
    });

    this.jsonForm.get('jsonInput')?.valueChanges.subscribe(value => {
      try {
        const jsonData = JSON.parse(value);
        this.errorMessage = null;
        this.jsonParsed.emit(jsonData);
      } catch (e) {
        this.errorMessage = 'Invalid JSON format';
        this.jsonParsed.emit(null);
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
}
