import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  public passwordVisible: boolean = false;

  loginForm! : FormGroup;


  constructor(private fb : FormBuilder, public authService: AuthService,private router: Router){
  }

  ngOnInit() : void {
    this.loginForm = this.fb.group({
      email : ['' , [Validators.required, Validators.email]],
      password : ['' , [Validators.required, passwordValidator()]]
      
    });



    this.loginForm.reset();
  }

  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


onSubmit(){

  if (this.loginForm.valid) {
    const {  email, password } = this.loginForm.value;
    this.authService.signin(email, password).subscribe({
      next: (response:any) => {
    
             // Assuming the server returns a token in the 'token' property of the response
        // Assuming the server returns a token in the 'token' property of the response
       // const token = response.token;
        // Store the token in localStorage for later use (token persistence)
        localStorage.setItem('token', response.token);
        // Navigate to the dashboard route
        this.router.navigate(['/dashboard']); 
        // Handle the successful registration response here (e.g., display a success message)
        console.log('Sign-in  successful:', response);


      },
      error: (error: HttpErrorResponse) => {
       if (error.status == 400){
        console.error('Incorrect username or password.', 'Authentication failed.');
       }
        // Handle the registration error (e.g., display an error message)
        console.error('Sign-in failed:', error);
      }
    });
  } else {
    // Handle form validation errors if needed
  }

}

}
