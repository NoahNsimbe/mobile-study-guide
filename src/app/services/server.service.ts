import { Injectable } from '@angular/core';
import {Career} from '../models/Career';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Uace} from '../models/uace';
import {Uce} from '../models/uce';
import {Combination, Program, UserSubmissions} from '../models/Recommendation';

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

  getCareers(): Observable<Career[]> {

    return this.httpClient
        .get<Career[]>(`${environment.apiRoot}${environment.careers}`)
        .pipe(retry(3), catchError(ServerService.handleError));

  }

  getUaceSubjects(): Observable<Uace[]> {

    return this.httpClient
        .get<Uace[]>(`${environment.apiRoot}${environment.uaceSubjects}`)
        .pipe(retry(3), catchError(ServerService.handleError));

  }

  getUceSubjects(): Observable<Uce[]> {

    return this.httpClient
        .get<Uce[]>(`${environment.apiRoot}${environment.uceSubjects}`)
        .pipe(retry(3), catchError(ServerService.handleError));

  }

  getCombinations(submissions: UserSubmissions, careerOnly: boolean): Observable<Combination[]> {

    let data: any;
    if (careerOnly === true) {
      data = {career : submissions.career};
    } else {
      data = {career : submissions.career, uce_results : submissions.uceResults};
    }

    return this.httpClient
        .post<Combination[]>(`${environment.apiRoot}${environment.combination}`, data)
        .pipe(retry(3), catchError(ServerService.handleError));
  }

  getPrograms(submissions: UserSubmissions, careerOnly: boolean): Observable<Program[]> {

    let data: any;
    if (careerOnly === true) {
      data = {career : submissions.career};
    } else {
      data = {career : submissions.career, uce_results : submissions.uceResults, uace_results : submissions.uaceResults};
    }

    return this.httpClient
        .post<Program[]>(`${environment.apiRoot}${environment.course}`, data)
        .pipe(retry(3), catchError(ServerService.handleError));
  }

}
