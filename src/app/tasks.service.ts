import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }


  getAllTasks() {
    return this.http.get('http://jsonplaceholder.typicode.com/todos')
    .pipe(
      catchError((error: Error) => {
        this.logger.logError(error, 'error in getAllTasks');
        return throwError('Error');
      })
    );
  }
}
