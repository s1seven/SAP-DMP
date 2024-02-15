<p align="center">
  <img src="logo.png">
</p>

# S1SEVEN SAP Manual

This repository contains the SAP Manual for the S1SEVEN ecosystem.

# Adding content

To add content, add a folder to `content`, then add the content in markdown format in a `README.md` file in that folder. To add a link to the new folder to the documentation, add a new object to `sidebar` in `docs/.vuepress/config.ts`. To see how the new content is rendered, run `GITHUB_TOKEN=<your github token> npm run docs:dev`.

# Content Guidelines

## Section Titles

Use title case and imperative mood for section titles. For example, use "Create a Wallet" instead of "Creating a Wallet" or "How to Create a Wallet".

## Application Screenshots

Screenshots from the S1SEVEN platform should be taken from the `en` locale, and should be taken from a 1000x618 screen. Use the built-in screenshot tool in your browser to take the screenshots.

Before taking the screenshot, enable demo mode by pressing Ctrl+Shift+D.

# Repo sync

The files found in `docs/.vuepress/public/`, `docs/.vuepress/styles/`, `docs/.vuepress/theme/`, and `helpers/` should not be modifed directly. They are synced over from the `platform` repo using `Redocly/repo-file-sync-action`. This allows the styling of the developers manual and SAP manual to be kept in sync, as well as the logic behind the helpers.

Any changes to these files should be made in `platform` and will be synced automatically when the PR in `platform` is merged to `main`. You will then have to approve the PR in `SAP-manual` that is opened by `Redocly/repo-file-sync-action`.

The files can be found at `api-docs/docs/.vuepress` in `platform`, and the helpers are at `api-docs/helpers`.
