import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { TasksService } from './tasks.service';
import { LoggerService } from './logger.service';

describe('TasksService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: TasksService;
  let loggerService: LoggerService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TasksService);
    loggerService = TestBed.get(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getAllTask', () => {
    it('should return tasks', () => {
      // Arrange
      const expectData = [
        {
          'userId': 1,
          'id': 1,
          'title': 'delectus aut autem',
          'completed': false
        },
        {
          'userId': 1,
          'id': 2,
          'title': 'quis ut nam facilis et officia qui',
          'completed': false
        },
      ];
      let dataError, dataResponse;
      // Act
      service.getAllTasks()
      .subscribe((response) => {
        dataResponse = response;
      }, (error) => {
        dataError = error;
      });
      const req = httpTestingController.expectOne(`http://jsonplaceholder.typicode.com/todos`);
      req.flush(expectData);
      // Assert
      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });


    it('should call to logger error', () => {
      const error_msg = 'deliberate 404 error';
      spyOn(loggerService, 'logError').and.callFake(() => {});
      service.getAllTasks()
      .subscribe(
        () => fail('Error'),
        (error: string) => {
          expect(error).toEqual('Error');
        }
      );
      const req = httpTestingController.expectOne(`http://jsonplaceholder.typicode.com/todos`);
      expect(req.request.method).toEqual('GET');
      req.flush(error_msg, { status: 404, statusText: 'Not Found' });

      expect(loggerService.logError).toHaveBeenCalled();
    });
  });

});
