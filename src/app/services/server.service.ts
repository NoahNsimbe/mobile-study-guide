import { Injectable } from '@angular/core';
import {Career} from '../models/Career';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Uace} from '../models/uace';
import {Uce} from '../models/uce';
import {
  Combination,
  Program,
  ProgramCheck,
  ProgramCheckResults,
  UserResults,
  UserSubmissions
} from '../models/Recommendation';
import {Article} from "../models/Article";
import {ProgramDetails} from "../models/Program";

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
    }

    else {
      if (error.status === 500) {
        userResponse = "Sorry, we experienced an error while processing your results, try again later";
      }

      else if (error.status === 504) {
        userResponse = "Failed to connect to server, try again later";
      }

      else {
        userResponse = 'Something bad happened. Please try again later';
      }

      // console.error(
      //     `Backend returned code ${error.status}, ` +  `body was: ${error.error}`);
    }

    // console.error("\n\nUsers response");
    // console.error(error.status);
    // console.error(userResponse);

    return throwError(userResponse);
  }

  async getCareers(): Promise<Career[]> {

    return this.httpClient
        .get<Career[]>(`${environment.apiRoot}${environment.careers}`)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }

  async getPrograms(programCode?: string): Promise<Program[]> {
    let endPoint : string;
    if(programCode === null || programCode === undefined || programCode === ""){
      endPoint = environment.programs;
    }
    else{
      endPoint = environment.programs + programCode.trim().toUpperCase() + '/';
    }

    return this.httpClient
        .get<Program[]>(`${environment.apiRoot}${endPoint}`)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }

  async getProgramDetails(programCode: string): Promise<ProgramDetails> {
    const data = {
        program_code : programCode
      };
    return this.httpClient
        .post<ProgramDetails>(`${environment.apiRoot}${environment.programDetails}`, data)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }

  async getArticle(id: number): Promise<Article> {
    return this.httpClient
        .get<Article>(`${environment.apiRoot}${environment.articles}${id}`)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }

  async getUaceSubjects(): Promise<Uace[]> {

    return this.httpClient
        .get<Uace[]>(`${environment.apiRoot}${environment.uaceSubjects}`)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }

  async getUceSubjects(): Promise<Uce[]> {

    return this.httpClient
        .get<Uce[]>(`${environment.apiRoot}${environment.uceSubjects}`)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }

  async getArticles(): Promise<Article[]> {

    return this.httpClient
        .get<Article[]>(`${environment.apiRoot}${environment.articles}`)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }


  async checkProgram(submission : ProgramCheck): Promise<ProgramCheckResults> {

    return this.httpClient
        .post<ProgramCheckResults>(`${environment.apiRoot}${environment.programCheck}`, submission)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }

  async getCombinations(submissions: UserSubmissions, includeResults: boolean): Promise<Combination[]> {

    let data: any;
    if (includeResults === true) {
      data = {
        career : submissions.career,
        uce_results : this.formatUserResults(submissions.uceResults),
      };
    } else {
      data = {career : submissions.career};
    }

    return this.httpClient
        .post<Combination[]>(`${environment.apiRoot}${environment.combination}`, data)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();
  }

  async getCourses(submissions: UserSubmissions, includeResults: boolean): Promise<Program[]> {

    let data: any;
    if (includeResults === true) {
      data = {
        career : submissions.career,
        uce_results : this.formatUserResults(submissions.uceResults),
        uace_results : this.formatUserResults(submissions.uaceResults),
        admission_type : submissions.admissionType,
        gender : submissions.gender,
      };
    } else {
      data = {career : submissions.career};
    }

    return this.httpClient
        .post<Program[]>(`${environment.apiRoot}${environment.course}`, data)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();
  }

  // async getProgram(submissions: UserSubmissions, careerOnly: boolean): Promise<Program[]> {
  //
  //   let data: any;
  //   if (careerOnly === true) {
  //     data = {career : submissions.career};
  //   } else {
  //     data = {career : submissions.career,
  //       uce_results : this.formatUserResults(submissions.uceResults),
  //       uace_results : this.formatUserResults(submissions.uaceResults)};
  //   }
  //
  //   return this.httpClient
  //       .post<Program[]>(`${environment.apiRoot}${environment.course}`, data)
  //       .pipe(retry(3), catchError(ServerService.handleError)).toPromise();
  // }


  // checkProgram(submission : ProgramCheck): Observable<any> {
  //
  //   return this.httpClient
  //       .post<any>(`${environment.apiRoot}${environment.programCheck}`, submission)
  //       .pipe(retry(3), catchError(ServerService.handleError));
  //
  // }
  //
  // getCombinations(submissions: UserSubmissions, includeResults: boolean): Observable<any> {
  //
  //   let data: any;
  //   if (includeResults === true) {
  //     data = {
  //       career : submissions.career,
  //       uce_results : this.formatUserResults(submissions.uceResults),
  //     };
  //   } else {
  //     data = {career : submissions.career};
  //   }
  //
  //   return this.httpClient
  //       .post<any>(`${environment.apiRoot}${environment.combination}`, data)
  //       .pipe(retry(3), catchError(ServerService.handleError));
  // }
  //
  // getCourses(submissions: UserSubmissions, includeResults: boolean): Observable<any> {
  //
  //   let data: any;
  //   if (includeResults === true) {
  //     data = {
  //       career : submissions.career,
  //       uce_results : this.formatUserResults(submissions.uceResults),
  //       uace_results : this.formatUserResults(submissions.uaceResults),
  //       admission_type : submissions.admissionType,
  //       gender : submissions.gender,
  //     };
  //   } else {
  //     data = {career : submissions.career};
  //   }
  //
  //   return this.httpClient
  //       .post<any>(`${environment.apiRoot}${environment.course}`, data)
  //       .pipe(retry(3), catchError(ServerService.handleError));
  // }
  //
  // getProgram(submissions: UserSubmissions, careerOnly: boolean): Observable<Program[]> {
  //
  //   let data: any;
  //   if (careerOnly === true) {
  //     data = {career : submissions.career};
  //   } else {
  //     data = {career : submissions.career,
  //       uce_results : this.formatUserResults(submissions.uceResults),
  //       uace_results : this.formatUserResults(submissions.uaceResults)};
  //   }
  //
  //   return this.httpClient
  //       .post<Program[]>(`${environment.apiRoot}${environment.course}`, data)
  //       .pipe(retry(3), catchError(ServerService.handleError));
  // }
  //
  // recommendCombinations(programCode: string): Observable<Combination[]> {
  //
  //   console.log(programCode);
  //
  //   const data = {program_code : programCode};
  //
  //   return this.httpClient
  //       .post<Combination[]>(`${environment.apiRoot}${environment.recommendCombinations}`, data)
  //       .pipe(retry(3), catchError(ServerService.handleError));
  // }

  async recommendCombinations(programCode: string): Promise<Combination[]> {
    console.log(programCode);

    const data = {program_code : programCode};

    return this.httpClient
        .post<Combination[]>(`${environment.apiRoot}${environment.recommendCombinations}`, data)
        .pipe(retry(3), catchError(ServerService.handleError)).toPromise();

  }

  formatUserResults(userResults : UserResults[]): any{
    let output : {} = {};
    userResults.forEach(value => {
      output[value.code] = value.value;
    })

    return output;
  }


}
