import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
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

  private log(error: Error, logMsg: any): void {
    this.logs.push(logMsg.extra.title);
    // send error to SENTRY;
  }
}
