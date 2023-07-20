import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { catchError } from "rxjs/internal/operators/catchError";





@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( private http: HttpClient) { }

    readonly apiUrl = 'https://localhost:7272';


// Method to handle user registration logic
signup(username: string, email: string, password: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = { username, email, password };
  return this.http.post<any>(this.apiUrl + '/api/Auth/Register', body, { headers })
    .pipe(
      catchError((error) => {
        // Handle any errors here (e.g., display an error message)
        console.error('Sign-up failed:', error);
        throw error;
      })
   );
}

signin(email: string, password: string) {

  const body = { email, password };
  
  // Specify the responseType as 'text' using a generic parameter
  return this.http.post<any>(this.apiUrl + '/api/Auth/Login', body).pipe(
    catchError((error) => {
      console.error('Sign-in failed:', error);
      return error('Sign-in failed. Please try again later.');
    })
  );
  }

}