const fs = require('fs');
jest.mock('fs');
const { getMockFs } = require('../lib/helpers');

test('should pass', async () => {
  fs.writeFileSync('test.txt', 'test');
  const content = fs.readFileSync('test.txt');
  console.log(getMockFs());
  expect(content).toBe('test');
});
