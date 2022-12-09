const Intern = require('../lib/Intern');

test('Can set school via constructor arguments', () => {
  const testValue = 'UCI';
  const intern = new Intern('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(intern.school).toBe(testValue);
});

test('Can get school via getSchool()', () => {
  const testValue = 'nbtrieu';
  const intern = new Intern('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(intern.getSchool()).toBe(testValue);
});

test('Can get `Intern` role via getRole()', () => {
  const testValue = 'Intern';
  const intern = new Intern('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(intern.getRole()).toBe(testValue);
});