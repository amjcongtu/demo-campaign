
const getPublicUrlOrPath = require('./getPublicUrlOrPath');
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (isProduction) => {
  return getPublicUrlOrPath(
    isProduction,
    require(resolveApp('package.json')).homepage,
    process.env.PUBLIC_URL,
  );
};
