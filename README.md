# jest-mock-fs

Node's `fs` mock for [jest](https://jestjs.io/).

## APIs Implemented
- [x] `fs.readFileSync`
- [x] `fs.readdirSync`
- [x] `fs.writeFileSync`
- [x] `fs.readFile`
- [x] `fs.readdir`
- [x] `fs.writeFile`
- [ ] `fs.stat`
- [ ] `fs.unlink`
- [ ] `fs.mkdir`
- [ ] `fs.rmdir`

## Setup

**Step 1:** Install library
```sh
npm i --save-dev jest-mock-fs
```

**Step 2:** Create a mock and re-export library
Inside your `tests/__mocks__/fs.js`
```js
const fs = require('jest-mock-fs');
module.exports = fs;
```

**Step 3:** Add mock
Inside your `tests/example.test.js`
```js
jest.mock('fs');
```

<details>
<summary>View Full <code>example.test.js</code> file</summary>

```js
const fs = require('fs');
jest.mock('fs');

test('should return content', async () => {
  // This will not create an actual file in your file system
  fs.writeFileSync('test.txt', 'test');
  const content = fs.readFileSync('test.txt', 'utf-8');
  expect(content).toBe('test');
});

```
</details>