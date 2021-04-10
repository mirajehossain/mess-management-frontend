import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   *  Login to mess
   * @param obj user object
   */
  login(obj: any): Observable<any> {
      const url = environment.apiUrl + '/auth/login';
      return this.http.post<any>(url, obj)
        .pipe(catchError(this.handleError));
  }
  /**
   *  Signup new mess
   * @param obj new mess object
   */
  signup(obj: any): Observable<any> {
      const url = environment.apiUrl + '/auth/signup';
      return this.http.post<any>(url, obj)
        .pipe(catchError(this.handleError));
  }

  /**
   *  Add member to the mess
   * @param obj user object
   */
  addMember(obj: any): Observable<any> {
    const url = environment.apiUrlUser + '/addUser';
    console.log(url);
    return this.http.post(url, obj)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all mess members
   */
  getMembers(): Observable<any> {
    const url = environment.apiUrlUser + '/getUsers';
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }

  /**
   *  Add new category in the mess
   * @param obj category object
   */
  addCategory(obj): Observable<any> {
    const url = environment.apiUrlCategory + '/addCategory';
    return this.http.post(url, obj)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get All categories
   */
  getCategory(): Observable<any> {
    const url = environment.apiUrlCategory + '/getCategory';
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  /**
   *  To update category
   * @param id CategoryID
   * @param update update object of category
   */
  updateCategory(id: string, update: object ): Observable<any> {
    const url = environment.apiUrlCategory + '/updateCategory/' + id;
    return this.http.put(url, update)
      .pipe(catchError(this.handleError));
  }
  getBalance(): Observable<any> {
    const url = environment.apiUrlBalance + '/messTotalBalance';
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }
  addBalance(balance): Observable<any> {
    const url = environment.apiUrlBalance + '/addBalance';
    return this.http.post(url, balance)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError(`${JSON.stringify(error.error.message)}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      return throwError(`${JSON.stringify(error.message)}`);
    }
    // return an observable with a user-facing error message
    // return throwError(
      // 'Something bad happened; please try again later.');
  }
}
