import { Person } from './person.model';

describe('Test for PersonModel', () => {

  describe('Test for person.getFullName', () => {

    it('should return an string with name + lastname', () => {
      const person = new Person('Nicolas', 'Molina', 25);
      expect(person.getFullName()).toEqual('Nicolas Molina');
    });

  });

  describe('Test for person.getAgeInYears', () => {

    it('should return 25 years', () => {
      const person = new Person('Nicolas', 'Molina', 25);
      const age = person.getAgeInYears(10);
      expect(age).toEqual(35);
    });

    it('should return 40 years', () => {
      const person = new Person('Nicolas', 'Molina', 20);
      const age = person.getAgeInYears(20);
      expect(age).toEqual(40);
    });

    it('should return 25 years with negative number', () => {
      const person = new Person('Nicolas', 'Molina', 25);
      const age = person.getAgeInYears(-10);
      expect(age).toEqual(25);
    });

  });
});
