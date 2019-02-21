import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
  ) { }


  getAllTasks() {
    return this.http.get('http://jsonplaceholder.typicode.com/todos');
  }
}
