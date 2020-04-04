import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server } from '../model/server.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private url = environment.protocol + '://' + environment.domain + ':' + environment.port + environment.api;

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Server[]> {
    return this.http.get<Server[]>(this.url).pipe(catchError(this.handleException));
  }

  create(server: Server): Observable<Server> {
    return this.http.post<Server>(this.url, server).pipe(catchError(this.handleException));
  }

  remove(id: number): Observable<String> {
    return this.http.delete(this.url + '/' + id, { responseType: 'text' })
      .pipe(catchError(this.handleException));
  }

  private handleException(err: HttpErrorResponse): Observable<never> {
    return throwError(err.error);
  }
}
