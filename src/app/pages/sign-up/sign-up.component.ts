import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from "../../forms/text-input/text-input.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthVisualsComponent } from "../../layout/auth-visuals/auth-visuals.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    RouterLink,
    AuthVisualsComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
      this.initializeForm();
  }

  private initializeForm() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.signUpForm.controls['password'].valueChanges.subscribe({
      next: () => this.signUpForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    console.log(this.signUpForm.controls['confirmPassword']);
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { isMatching: true }
    }
  }
}
