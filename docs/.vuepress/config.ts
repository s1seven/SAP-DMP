import { defaultTheme } from '@vuepress/theme-default';
import { resolve } from 'path';
import { defineUserConfig, ThemeObject } from 'vuepress';
import { getVersions } from '../../helpers/get-versions';
import clientTheme from './theme/client';
import pkg from '../../package.json';
import searchPlugin from '@vuepress/plugin-search';

const API_VERSION = '1.0';

async function customTheme() {
  const supportedVersions = await getVersions();

  const theme: ThemeObject = defaultTheme({
    logo: '/logo.svg',
    editLinkText: '',
    lastUpdated: false,
    navbar: [
      { text: 'Home', link: '/' },
    ],
    docsDir: 'docs',
    sidebar: [
      {
        text: 'FAQ',
        link: '/faq/',
      },
      {
        text: 'Setup Instructions',
        link: '/setup/',
      },
      {
        text: 'User Manual',
        link: '/manual/',
      },
    ],
  });
  return { ...clientTheme, ...theme };
}

export default defineUserConfig({
  plugins: [searchPlugin({})],
  locales: {
    '/': {
      title: 'SAP Manual',
    },
  },
  base: '/',
  head: [
    ['meta', { name: 'theme-color', content: '#003EE8' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  theme: await customTheme(),
  alias: {
    '@theme/Home.vue': resolve(__dirname, './theme/components/Home.vue'),
  },
});
