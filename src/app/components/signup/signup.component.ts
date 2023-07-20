import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, ValidatorFn , AbstractControl } from '@angular/forms';


import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';



 function passwordValidator(): ValidatorFn  {
  return (c: AbstractControl): { [key: string]: boolean }  | null => {

    const password: string = c.value;

    if (!password) {
      // Return null if the field is empty, meaning the required validator will handle this case.
      return null;
    }

    // Regular expressions for each requirement.
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharacterRegex = /[!@#$%^&*()_+[\]{}|\\;:'",.<>/?-]/;
    const minLength = 8; // Change this to set the minimum length required.

    // Check if the password meets all requirements.
    if (
      !uppercaseRegex.test(password) ||
      !numberRegex.test(password) ||
      !specialCharacterRegex.test(password) ||
      password.length < minLength
    ) {
      return { invalidPassword: true };
    }

    return null;
  };
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent  implements OnInit {

  public passwordVisible: boolean = false;

  signupForm! : FormGroup;



  
  constructor(private fb : FormBuilder,public authService: AuthService , private router: Router){ 
  }

  ngOnInit() : void {
   this.signupForm = this.fb.group({
    username : ['',[Validators.required,Validators.minLength(3)]],
    email : ['',[Validators.required, Validators.email]],
    password : ['', [, Validators.required,passwordValidator()]]
   });


   this.signupForm.reset();
  }



  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      this.authService.signup(username, email, password).subscribe({
        next: (response:any) => {
          this.router.navigate(['/login']);
          // Handle the successful registration response here (e.g., display a success message)
          console.log('Sign-up successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          // Handle the registration error (e.g., display an error message)
          console.error('Sign-up failed:', error);
        }
      });
    } else {
      // Handle form validation errors if needed
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.signupForm.reset();
    this.router.navigate(['/login']);
  }


}
