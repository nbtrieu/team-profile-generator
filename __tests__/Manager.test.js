const Manager = require('../lib/Manager');

test('Can set office number via constructor arguments', () => {
  const testValue = 2;
  const manager = new Manager('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(manager.officeNumber).toBe(testValue);
});

test('Can get office number via getOfficeNumber()', () => {
  const testValue = 2;
  const manager = new Manager('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(manager.getOfficeNumber()).toBe(testValue);
});

test('Can get `Manager` role via getRole()', () => {
  const testValue = 'Manager';
  const manager = new Manager('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(manager.getRole()).toBe(testValue);
});