const fs = require(`fs`);
const util = require(`util`);
const access = util.promisify(fs.access);
const unlink = util.promisify(fs.unlink);
const readFile = util.promisify(fs.readFile);
const assert = require(`assert`);

const generateCommand = require(`../src/cli/generate`);

const fileReadOptions = {encoding: `utf-8`, mode: 0o644};

describe(`Generate JSON command`, function () {
  it(`should fail on not existing folder`, function () {
    const tempFileName = `${__dirname}/notExistsFolder/testfile.json`;
    return generateCommand.execute(tempFileName)
        .then(
            () => assert.fail(`Path ${tempFileName} should not be available`),
            (err) => assert.ok(err)
        );
  });

  it(`should create new file`, function () {
    const tempFileName = `${__dirname}/testfile.json`;
    return generateCommand.execute(tempFileName)
        .then(() => access(tempFileName))
        .then(() => unlink(tempFileName));
  });
  it(`should create correct count of elements`, function () {
    const tempFileName = `${__dirname}/testfile.json`;
    return generateCommand.execute(tempFileName, 5)
        .then(() => readFile(tempFileName, fileReadOptions))
        .then((data) => {
          data = JSON.parse(data);
          assert.equal(data.length, 5);
        })
        .then(() => unlink(tempFileName))
        .catch((err) => {
          unlink(tempFileName);
          throw err;
        });
  });
});
