const cpx = require('cpx');
const { globSync } = require('glob');
const path = require('path');
const { promisify } = require('util');

(async function () {
  const docsPath = './docs';
  const files = [
    { input: 'logo.svg', output: `${docsPath}/.vuepress/public` },
    { input: 'chains.svg', output: `${docsPath}/.vuepress/public` },
    { input: 'index.md', output: docsPath },
  ];

  const dirs = globSync(`./content/*`);

  dirs.forEach((dir) => {
    files.push({
      input: `${dir}/**/*`,
      output: path.join('./', docsPath, path.basename(dir)),
    });
  });

  const promises = files.map(async ({ input, output }) => {
    await promisify(cpx.copy)(input, output);
    console.log(`Copied ${input} to ${output}`);
  });

  await Promise.all(promises);
})();
