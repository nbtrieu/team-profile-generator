const Engineer = require('../lib/Engineer');

test('Can set GitHub username via constructor arguments', () => {
  const testValue = 'nbtrieu';
  const engineer = new Engineer('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(engineer.github).toBe(testValue);
});

test('Can get GitHub username via getGithub()', () => {
  const testValue = 'nbtrieu';
  const engineer = new Engineer('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(engineer.getGithub()).toBe(testValue);
});

test('Can get `Engineer` role via getRole()', () => {
  const testValue = 'Engineer';
  const engineer = new Engineer('Nicole', 1, 'nbtrieu@uci.edu', testValue);
  expect(engineer.getRole()).toBe(testValue);
});