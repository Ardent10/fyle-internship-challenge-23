import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // Method to get user data
  getUserData(githubUsername: string): Observable<any> {
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            // User not found, you can handle this as needed (e.g., redirect)
            console.error('User not found');
          } else {
            console.error(error);
          }
          // Propagate the error further
          return throwError(() => error);
        })
      );
  }

  // Method to get all repositories
  getAllRepos(githubUsername: string, pageNumber: number, itemsPerPage:number): Observable<any> {
    return this.httpClient
      .get(
        `https://api.github.com/users/${githubUsername}/repos?per_page=${itemsPerPage}&page=${pageNumber}`
      )
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            // User not found, you can handle this as needed (e.g., redirect)
            console.error('User not found');
          } else {
            console.error(error);
          }
          // Propagate the error further
          return throwError(() => error);
        })
      );
  }
}
