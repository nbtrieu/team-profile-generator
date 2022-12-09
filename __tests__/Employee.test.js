const Employee = require('../lib/Employee');

test('Can instantiate Employee object instance', () => {
  const employee = new Employee();
  expect(typeof(employee)).toBe('object');
});

test('Can set name via constructor arguments', () => {
  const testValue = 'Nicole';
  const employee = new Employee(testValue);
  expect(employee.name).toBe(testValue);
});

test('Can set ID number via constructor arguments', () => {
  const testValue = 1;
  const employee = new Employee('Nicole', testValue);
  expect(employee.id).toBe(testValue);
});

test('Can set email via constructor arguments', () => {
  const testValue = 'nbtrieu@uci.edu';
  const employee = new Employee('Nicole', 1, testValue);
  expect(employee.email).toBe(testValue);
});

test('Can get name via getName()', () => {
  const testValue = 'Nicole';
  const employee = new Employee(testValue);
  expect(employee.getName()).toBe(testValue);
});

test('Can get ID number via getId()', () => {
  const testValue = 1;
  const employee = new Employee('Nicole', testValue);
  expect(employee.getId()).toBe(testValue);
});

test('Can get email via getEmail()', () => {
  const testValue = 'nbtrieu@uci.edu';
  const employee = new Employee('Nicole', 1, testValue);
  expect(employee.getEmail()).toBe(testValue);
});

test('Can get `Employee` role via getRole()', () => {
  const testValue = 'Employee';
  const employee = new Employee('Nicole', 1, testValue);
  expect(employee.getRole()).toBe(testValue);
})