import { Injectable } from '@angular/core';
import {Career} from '../models/Career';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private httpClient: HttpClient) { }

  private static handleError(error: HttpErrorResponse) {
    console.log(error);
    let userResponse: any;
    if (error.error instanceof ErrorEvent) {
      userResponse = error.error.message;
      console.error('An error occurred:', userResponse);
    } else {
      if (error.status === 500) {
        userResponse = error.error;
      } else {
        userResponse = 'Something bad happened. Please try again later';
      }
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }

    return throwError(userResponse);
  }

  getSubjects() {
    return [];
  }

  getCareers(): Observable<Career[]> {

    return this.httpClient
        .get<Career[]>(`${environment.apiRoot}${environment.careers}`)
        .pipe(retry(3), catchError(ServerService.handleError));

  }
}
