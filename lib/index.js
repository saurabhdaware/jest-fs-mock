const fs = jest.createMockFromModule('fs');

const mockFs = {};

fs.readFile = async (...args) => fs.readFileSync(...args);

fs.writeFile = async (...args) => {
  fs.writeFileSync(...args);
  return Promise.resolve();
};

fs.readFileSync = (filePath, encoding) => {
  const content = mockFs[filePath];
  if (typeof encoding === 'string' && encoding.includes('utf')) {
    return content;
  }

  return Buffer.from(content, 'utf8');
};

fs.writeFileSync = (filePath, content) => {
  mockFs[filePath] = content;
};

fs.existsSync = (filePath) => !!mockFs[filePath];

fs.readdirSync = (dirPath) => {
  const files = Object.keys(mockFs).filter((filePath) =>
    filePath.startsWith(dirPath)
  );
  return files;
};

fs.__getMockFs = () => mockFs;

module.exports = fs;
