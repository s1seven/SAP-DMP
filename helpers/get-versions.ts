import axios, { AxiosRequestConfig } from 'axios';
import pkg from '../package.json';
import { packageName } from './constants';

export interface GithubTreeItem {
  path: string;
  url: string;
}

export type VersionsOptions = { value: string; text: string }[];

function hasGithubToken() {
  if (!process.env.GITHUB_TOKEN) {
    throw Error('Environment variable GITHUB_TOKEN is missing');
  }
}

const axiosBaseConfig = ({ githubToken }): AxiosRequestConfig => ({
  responseType: 'json',
  headers: {
    accept: 'application/vnd.github.v3+json',
    authorization: `token ${githubToken}`,
  },
});

async function getGithubPagesTree(): Promise<GithubTreeItem[]> {
  hasGithubToken();
  const url = `https://api.github.com/repos/${pkg.author}/${packageName}/git/trees/gh-pages`;
  const { data } = await axios<{ tree: GithubTreeItem[] }>({
    ...axiosBaseConfig({ githubToken: process.env.GITHUB_TOKEN }),
    method: 'get',
    url,
  });
  return data.tree;
}

async function getGithubPagesVersionFolderTree(
  tree: GithubTreeItem[]
): Promise<GithubTreeItem[]> {
  hasGithubToken();
  const versionNode = tree.find((e) => e.path.toLowerCase() === 'version');
  const { data } = await axios<{ tree: GithubTreeItem[] }>({
    ...axiosBaseConfig({ githubToken: process.env.GITHUB_TOKEN }),
    method: 'get',
    url: versionNode.url,
  });
  return data.tree;
}

function getOptionsFromTree(tree: GithubTreeItem[]): VersionsOptions {
  const options = tree
    .map((e) => ({ value: e.path, text: e.path }))
    .sort((e1, e2) => {
      const e1Arr = e1.text.split('.');
      const e2Arr = e2.text.split('.');
      for (let i = 0; i < e1Arr.length && i < e2Arr.length; i++) {
        const e1V = parseInt(e1Arr[i]);
        const e2V = parseInt(e2Arr[i]);
        if (e1V !== e2V) return e2V - e1V;
        if (e1Arr[i] !== e2Arr[i])
          return parseInt(e2Arr[i]) - parseInt(e1Arr[i]);
      }
      return e1.text === e2.text ? 0 : e2.text < e1.text ? -1 : 1;
    });
  options.unshift({ value: 'main', text: 'main' });
  return options;
}

export async function getVersions(): Promise<VersionsOptions> {
  const tree = await getGithubPagesTree();
  const versionFolderTree = await getGithubPagesVersionFolderTree(tree);
  return getOptionsFromTree(versionFolderTree);
}
