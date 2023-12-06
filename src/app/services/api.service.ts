import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private handleHttpError(error: HttpErrorResponse) {
   const errorResponse = new HttpErrorResponse({
     error: error.error || null,
     status: error.status || 0,
     statusText: error.statusText || 'Unknown Error',
   });

   const errorMessage =
     errorResponse.status === 404
       ? 'User Not Found.'
       : `HTTP error: ${errorResponse.status} - ${errorResponse.message}`;

   return throwError(errorMessage);
  }

  // Method to get user data
  getUserData(githubUsername: string): Observable<any> {
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`)
      .pipe(catchError(catchError(this.handleHttpError)));
  }

  // Method to get all repositories
  getAllRepos(
    githubUsername: string,
    pageNumber: number,
    itemsPerPage: number
  ): Observable<any> {
    return this.httpClient
      .get(
        `https://api.github.com/users/${githubUsername}/repos?per_page=${itemsPerPage}&page=${pageNumber}`
      )
      .pipe(catchError(this.handleHttpError));
  }
}
