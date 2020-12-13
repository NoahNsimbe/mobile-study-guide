import { Injectable } from '@angular/core';
import {Career} from '../models/Career';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Uace} from '../models/uace';
import {Uce} from '../models/uce';
import {Combination, Program, ProgramCheck, UserSubmissions} from '../models/Recommendation';

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

  getPrograms(programCode?: string): Observable<Program[]> {
    let endPoint : string;
    if(programCode === null || programCode === undefined || programCode === ""){
      endPoint = environment.programs;
    }
    else{
      endPoint = environment.programs + programCode.trim().toUpperCase() + '/';
    }

    return this.httpClient
        .get<Program[]>(`${environment.apiRoot}${endPoint}`)
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


  checkProgram(submission : ProgramCheck): Observable<any> {
    return this.httpClient
        .post<any>(`${environment.apiRoot}${environment.programCheck}`, submission)
        .pipe(retry(3), catchError(ServerService.handleError));

  }

  getCombinations(submissions: UserSubmissions, includeResults: boolean): Observable<any> {

    let data: any;
    if (includeResults === true) {
      data = {
        career : submissions.career,
        uce_results : submissions.uceResults,
      };
    } else {
      data = {career : submissions.career};
    }

    return this.httpClient
        .post<any>(`${environment.apiRoot}${environment.combination}`, data)
        .pipe(retry(3), catchError(ServerService.handleError));
  }

  getCourses(submissions: UserSubmissions, includeResults: boolean): Observable<any> {

    let data: any;
    if (includeResults === true) {
      data = {
        career : submissions.career,
        uce_results : submissions.uceResults,
        uace_results : submissions.uaceResults,
        admission_type : submissions.admissionType,
        gender : submissions.gender,
      };
    } else {
      data = {career : submissions.career};
    }

    return this.httpClient
        .post<any>(`${environment.apiRoot}${environment.course}`, data)
        .pipe(retry(3), catchError(ServerService.handleError));
  }

  getProgram(submissions: UserSubmissions, careerOnly: boolean): Observable<Program[]> {

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

  recommendCombinations(programCode: string): Observable<Combination[]> {

    const data = {program_code : programCode};

    return this.httpClient
        .post<Combination[]>(`${environment.apiRoot}${environment.recommendCombinations}`, data)
        .pipe(retry(3), catchError(ServerService.handleError));
  }
}
