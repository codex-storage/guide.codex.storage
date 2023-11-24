// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config()

const downloadRemoteContent =
  process.env.SKIP_DOWNLOAD !== '1' && process.env.NODE_ENV !== 'production'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Waku',
  url: 'https://guide.waku.org/',
  baseUrl: '/',

  markdown: {
    mermaid: true,
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@acid-info/logos-docusaurus-preset',
      /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
      ({
        businessUnit: 'Waku',
        customSiteConfig: true,
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
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        og: {},
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 100,
        max: 1080,
        min: 400,
        steps: 2,
        disableInDev: true,
      },
    ],
    (downloadRemoteContent && [
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
        keepLocal: ['./visual-language/logo.mdx'],
        keepStatic: ['waku/**/*'],
      }),
    ]),
  ],

  themes: [
    [
      '@acid-info/logos-docusaurus-brand-guidelines-theme',
      /** @type {import('@acid-info/logos-docusaurus-brand-guidelines-theme').ThemeOptions} */
      ({
        customCss: [],
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@acid-info/logos-docusaurus-preset').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        items: [
          {
            type: 'search',
          },
        ],
      },
      footer: {
        copyright: 'Waku @2023<br/>All Rights Reserved.',
        links: [
          {
            items: [
              {
                href: 'https://twitter.com/waku_org',
                label: 'Twitter',
              },
              {
                href: 'https://discord.waku.org/',
                label: 'Discord',
              },
              {
                href: 'https://docs.waku.org',
                label: 'Docs',
              },
              {
                href: 'https://github.com/waku-org',
                label: 'Github',
              },
            ],
          },
          {
            items: [
              {
                href: 'https://jobs.status.im/',
                label: 'Work with us',
              },
              {
                href: '/terms',
                label: 'Terms & conditions',
              },
            ],
          },
        ],
      },
    }),
}

module.exports = config
