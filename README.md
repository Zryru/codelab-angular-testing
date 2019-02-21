# AngularTesting

## 1. Intro Jasmine

![Imgur](https://i.imgur.com/777x7hb.png)

```
describe('test', () => {
  it('test for a sum', () => {
    expect(5 + 5).toEqual(10);
  });
});
```

```
export class Person {

  constructor(
   public name: string,
   public lastname: string,
   public age: number
  ) {}

  getFullName(): string {
   return `${this.name} ${this.lastname}`;
  }

  getAgeInYears( years: number ): number {
   return this.age + years;
  }
}
```

````
import { Person } from './person.model';

describe('Test for Person', () => {

  // Code
});
````


````
import { Person } from './person.model';

describe('Test for Person', () => {

  // Code
});
````

````
  describe('Test for person.getFullName', () => {

    it('should return an string with name + lastname', () => {
      const person = new Person('Nicolas', 'Molina', 24);
      expect(person.getFullName()).toEqual('Nicolas Molina');
    });

  });
````

```
  describe('Test for person.getAgeInYears', () => {

    // code

  });
```

```
it('should return 34 years', () => {
  const person = new Person('Nicolas', 'Molina', 24);
  const age = person.getAgeInYears(10);
  expect(age).toEqual(34);
});
```

```
it('should return 35 years', () => {
  const person = new Person('Nicolas', 'Molina', 20);
  const age = person.getAgeInYears(15);
  expect(age).toEqual(35);
});
```

```
it('should return 28 years with negative number', () => {
  const person = new Person('Nicolas', 'Molina', 28);
  const age = person.getAgeInYears(-10);
  expect(age).toEqual(28);
});
```

```
npm i karma-mocha-reporter --save-dev
```

```
getAgeInYears( years: number ): number{
  if( years > 0 ){ 
    return this.age + years;
  }
  return this.age;
}
```

## 2. Tests services

![Imgur](https://i.imgur.com/UU8dybM.png)

```
ng g service logger
```

```
export class LoggerService {

  logs: string[] = [];

  constructor() { }

  logError(error: Error, msg: string): void {
    const logMsg = {
      level: 'error',
      extra: {
        title: `ERROR: ${msg}`
      }
    };
    console.error(logMsg.extra.title, error);
    this.log(error, logMsg);
  }

  private log(error: Error, logMsg: any): void {
    this.logs.push(logMsg.extra.title);
    // send error to SENTRY;
  }
}
```

```
describe('Test for logError', () => {

  it('should return "ERROR: error message"', () => {
    const service: LoggerService = TestBed.get(LoggerService);
    service.logError(new Error('error error'), 'error message');
    expect(service.logs[0]).toEqual('ERROR: error message');
  });

});
```

```
logWarning(error: Error, msg: string): void{
  const logMsg = {
    level: 'warning',
    extra: {
      title: `WARNING: ${msg}`
    }
  };
  console.warn(logMsg.extra.title, error);
  this.log(error, logMsg);
}
```


```
describe('Test for logWarning', () => {

  it('should return "WARNING: warning message"', () => {
    const service: LoggerService = TestBed.get(LoggerService);
    service.logWarning(new Error('warning error'), 'warning message');
    expect(service.logs[0]).toEqual('WARNING: warning message');
  });

});
```


```
describe('Test for log register', () => {

  it('should register four logs', () => {
    const service: LoggerService = TestBed.get(LoggerService);
    service.logError(new Error('error error'), 'error message');
    service.logWarning(new Error('warning error'), 'warning message');
    service.logError(new Error('error error'), 'error message');
    service.logWarning(new Error('warning error'), 'warning message');
    expect(service.logs[0]).toEqual('ERROR: error message');
    expect(service.logs[1]).toEqual('WARNING: warning message');
    expect(service.logs[2]).toEqual('ERROR: error message');
    expect(service.logs[3]).toEqual('WARNING: warning message');
  });
});
```
## 3. Tests httpClient

![Imgur](https://i.imgur.com/KeUU7IL.png)


```
ng g service tasks
```

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
  ) { }
}
```

```
getAllTasks() {
  return this.http.get('http://jsonplaceholder.typicode.com/todos');
}
```

```
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
});
```