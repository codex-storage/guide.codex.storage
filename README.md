# Logos Brand Guidelines


## How to Run Locally

1. Clone this repository
```bash
$ git clone https://github.com/acid-info/logos-brand-guidelines.git
```

2. Install the dependencies:
```bash
$ yarn install
```

3. Start the website:
```bash
$ yarn start
```

4. Visit `http://localhost:3000` in your browser


## Configuration
Edit the `docusaurus.config.js` file in the repository's root directory, and update the value of the `businessUnit` field in presets section; below is a list of valid values:
- Logos
- Codex
- Waku
- Nimbus
- Nomos
- VacResearch
- Acid.info

Example:
```js
presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    {
      businessUnit: 'Codex',
    },
  ],
],
```

This is typically sufficient for most cases, as the Logos plugins will automatically populate other configurations related to the specified business unit. If you encounter any errors in the information provided by Logos Plugins, please visit the [Logos Docusaurus Plugins](https://github.com/acid-info/logos-docusaurus-plugins) repository and open an issue.


## Docs Setup

This template does not include a landing page. Please review the `routeBasePath: '/'` setting in the `docusaurus.config.js` file.

```js
presets: [
    [
      '@acid-info/logos-docusaurus-preset',
      /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
      ({
        businessUnit: 'Codex',
        theme: {
          name: 'default',
          options: {
            customCss: [require.resolve('./src/css/custom.scss')],
            docs: {
              default: {
                sidebar: {
                  hide: false,
                },
              },
            },
          },
        },
        docs: {
          routeBasePath: '/', // the index.md becomes the index page
        },
        og: {},
      }),
    ]
]
```

The content in `docs/index.md` will serve as the root page for your documentation.

For additional customization options, please refer to the [Docusaurus Configuration](https://docusaurus.io/docs/configuration).


## Adding docs

To add a document, create a `.md` or `mdx` file within the `docs` directory. You can use [Frontmatter](https://docusaurus.io/docs/markdown-features#front-matter) to add metadata to your markdown file.

This repository extends content of the [Logos Brand Guidelines](https://github.com/acid-info/guide.logos.co) by leveraging the [Docusaurus Remote Content plugin](https://github.com/acid-info/logos-docusaurus-plugins/tree/main/packages/docusaurus-remote-content). The plugin downloads the content from the remote repository into this repository. To retrieve the content, run the following command:

```bash
yarn docusaurus remote-content download
```

This command automatically downloads content from the remote repository, replacing the local content in the `docs` directory and static files located in the `static` directory. However, if you wish to retain specific local files, follow these steps:

1. Open `docusaurus.config.js` in your project.

2. Locate the configuration for the `@acid-info/docusaurus-remote-content` plugin.

3. Add the paths of the local files you want to keep to either the `keepLocal` or `keepStatic` properties.

   - Paths in `keepLocal` should be relative to the `docs` directory at the root of this repository.
   - Paths in `keepStatic` should be relative to the `static` directory at the root of this repository.

Here are some examples using glob patterns:

- To keep a single file: `./visual-language/logo.mdx`
- To keep an entire directory: `./visual-language/**/*`

If you want to exclude specific files or directories from being copied from the remote repository, use the `excludeRemote` property. For instance, to exclude the `./visual-language/lsd/` directory, modify the plugin configuration as follows:

```javascript
plugins: [
  [
    '@acid-info/docusaurus-remote-content',
    /** @type {import('@acid-info/docusaurus-remote-content').PluginOptions} */
    ({
      remote: {
        type: 'zip',
        url:
          'https://github.com/acid-info/guide.logos.co/archive/refs/heads/develop.zip',
        dir: 'guide.logos.co-develop',
      },
      outDir: 'docs',
      sourceDir: 'docs',
      excludeRemote: ['./visual-language/lsd/**/*']
    }),
  ],
],
```

## Docusaurus Config

You can find instructions for adding additional documentation sections, implementing localization, and managing versioning on the [Docusaurus](https://docusaurus.io/docs) website.

> Please note that theme customization is somewhat restricted; for more detailed instructions on customizing your theme, visit the [Logos Docusaurus Theme](https://github.com/acid-info/logos-docusaurus-plugins/tree/main/packages/logos-docusaurus-theme/) repository.


## Custom CSS

By default, this template utilizes the CSS styles defined in the [logos-docusaurus-plugins](https://github.com/acid-info/logos-docusaurus-plugins/tree/main/packages/logos-docusaurus-theme/src/client/css) package. You have the option to define custom CSS in `src/css/custom.scss`.


## How to Run a Static Build (Production Build)

1. Generate static files for production:

```bash
$ yarn build
```

The static files will be created in the `build` directory.

2. Serve the static build:

```bash
$ yarn serve
```


## CI/CD

- The `master` branch is automatically deployed to the production server (e.g., logos.co) through [CI](https://ci.infra.status.im)
- The `develop` branch is automatically deployed to the staging server (e.g., dev.logos.co) through [CI](https://ci.infra.status.im)


## Change Process

1. Create a new working branch from `develop`: `git checkout develop; git checkout -b my-changes`.
2. Make your changes, push them to the `origin`, and open a Pull Request against the `develop` branch.
3. After approval, merge the pull request, and verify the changes on the staging server (e.g., https://dev.vac.dev).
4. When ready to promote changes to the live website, rebase the `master` branch on the staging changes: `git checkout master; git pull origin master; git rebase origin/develop; git push`.
