const fs = jest.createMockFromModule('fs');

const callbackifyApi = (args, actualApi) => {
  const callback = args[args.length - 1];
  const restArgs = args.slice(0, args.length - 1);
  try {
    const result = actualApi(...restArgs);
    callback(null, result);
  } catch (err) {
    callback(err);
  }
};

const mockFs = {};

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

fs.readFile = async (...args) => callbackifyApi(args, fs.readFileSync);

fs.writeFile = async (...args) => callbackifyApi(args, fs.writeFileSync);

fs.readdir = async (...args) => callbackifyApi(args, fs.readdirSync);

fs.__getMockFs = () => mockFs;

module.exports = fs;
