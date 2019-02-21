import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggerService = TestBed.get(LoggerService);
    expect(service).toBeTruthy();
  });

  describe('Test for logError', () => {

    it('should return "ERROR: error message"', () => {
      const service: LoggerService = TestBed.get(LoggerService);
      service.logError(new Error('error error'), 'error message');
      expect(service.logs[0]).toEqual('ERROR: error message');
    });

  });

  describe('Test for logWarning', () => {

    it('should return "WARNING: warning message"', () => {
      const service: LoggerService = TestBed.get(LoggerService);
      service.logWarning(new Error('warning error'), 'warning message');
      expect(service.logs[0]).toEqual('WARNING: warning message');
    });

  });

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
});
