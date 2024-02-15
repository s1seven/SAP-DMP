import { globSync } from 'glob';
import pkg from '../../../package.json';
import { getVersions } from '../../../helpers/get-versions';
import { strToBool } from '../../../helpers/helpers';

function getCurrentVersion() {
  const [major, minor] = pkg.version.split('.');
  return [major, minor].join('.');
}

// remove the path and extract just the file name
const files = globSync('./docs/.vuepress/public/specs/*.json').map((file) => file.split('/').pop());

export default {
  name: 'vuepress-theme-s1seven',
  define: {
    enableSwaggerUI: strToBool(process.env.ENABLE_SWAGGER_UI),
    commonSchemas: files,
    currentVersion: getCurrentVersion(),
    supportedVersions: await getVersions(),
    swaggerPagePaths: ['/docs/openapi/'],
  },
};
