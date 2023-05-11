/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually

  tutorialSidebar: [
    {
      type: 'html',
      value: '<img src="/img/launch.svg" width="20em" class="menu_icon" /> Getting Started',
      className: 'sidebar-title',
    },
    {
      type: 'doc',
      id: 'intro',
    },
    {
      type: 'doc',
      id: 'get-started/installation',
    },
    {
      type: 'doc',
      id: 'get-started/first-api',
    },
    {
      type: 'html',
      value: '<img src="/img/lightning.svg" width="20em" class="menu_icon" /> Building Analytics API',
      className: 'sidebar-title',
    },
    {
      type: 'doc',
      id: 'develop/init',
    },
    {
      type: 'category',
      label: 'Connecting to Data Sources',
      link: { type: 'doc', id: 'connect/overview' },
      items: [
        {
          type: 'doc',
          id: 'connect/overview',
        },
        {
          type: 'doc',
          id: 'connect/bigquery',
        },
        {
          type: 'doc',
          id: 'connect/postgresql',
        },
        {
          type: 'doc',
          id: 'connect/snowflake',
        },
        {
          type: 'doc',
          id: 'connect/duckdb',
        }
      ],
    },
    {
      type: 'category',
      label: 'Writing SQL Templates',
      link: { type: 'doc', id: 'develop/overview' },
      items: [
        {
          type: 'doc',
          id: 'develop/overview',
        },
        {
          type: 'doc',
          id: 'develop/dynamic-param',
        },
        {
          type: 'doc',
          id: 'develop/predefined-queries',
        },
        {
          type: 'doc',
          id: 'develop/http-req',
        },
        {
          type: 'doc',
          id: 'develop/advance',
        },
      ]
    },
    {
      type: 'doc',
      id: 'develop/cache',
    },
    {
      type: 'doc',
      id: 'develop/error',
    },
    {
      type: 'doc',
      id: 'develop/validator',
    },
    {
      type: 'category',
      label: 'Handling Data Privacy',
      link: { type: 'doc', id: 'data-privacy/overview' },
      items: [
        {
          type: 'doc',
          id: 'data-privacy/overview',
        },
        {
          type: 'doc',
          id: 'data-privacy/authn',
        },
        {
          type: 'doc',
          id: 'data-privacy/authz',
        },
        {
          type: 'doc',
          id: 'data-privacy/data-masking',
        },
        {
          type: 'doc',
          id: 'data-privacy/cls',
        },
        {
          type: 'doc',
          id: 'data-privacy/rls',
        },
      ],
    },
    {
      type: 'html',
      value: '<img src="/img/doc.svg" width="20em" class="menu_icon" /> API Catalog & Documentation',
      className: 'sidebar-title',
    },
    {
      type: 'category',
      label: 'Catalog',
      link: { type: 'doc', id: 'catalog/catalog-intro' },
      items: [
        {
          type: 'doc',
          id: 'catalog/catalog-intro',
        },
      ],
    },
    {
      type: 'doc',
      id: 'develop/api-doc',
    },
    {
      type: 'html',
      value: '<img src="/img/settings.svg" width="20em" class="menu_icon" /> API Configuration',
      className: 'sidebar-title',
    },
    {
      type: 'doc',
      id: 'api-plugin/overview',
    },
    {
      type: 'doc',
      id: 'api-plugin/format',
    },
    {
      type: 'category',
      label: 'Pagination',
      link: { type: 'doc', id: 'api-plugin/pagination' },
      items: [
        {
          type: 'doc',
          id: 'api-plugin/pagination',
        },
        {
          type: 'doc',
          id: 'develop/pagination/offset',
        },
      ],
    },
    {
      type: 'doc',
      id: 'api-plugin/cors',
    },
    {
      type: 'doc',
      id: 'api-plugin/rate-limit',
    },
    {
      type: 'doc',
      id: 'api-plugin/access-log',
    },
    // {
    //   type: 'category',
    //   label: 'Build VulcanSQL Projects',
    //   items: [
    //     {
    //       type: 'category',
    //       label: 'VulcanSQL Configuration',
    //       link: { type: 'doc', id: 'api-building/configuration' },
    //       items: [
    //         {
    //           type: 'doc',
    //           id: 'api-building/configuration/api-schema',
    //         },
    //         {
    //           type: 'doc',
    //           id: 'api-building/configuration/data-source-profile',
    //         },
    //       ],
    //     },
    //     {
    //       type: 'category',
    //       label: 'Writing SQL',
    //       link: { type: 'doc', id: 'api-building/writing-sql' },
    //       items: [
    //         {
    //           type: 'doc',
    //           id: 'api-building/sql-syntax',
    //         },
    //         {
    //           type: 'doc',
    //           id: 'api-building/predefined-queries',
    //         },
    //       ],
    //     },
    //     {
    //       type: 'doc',
    //       id: 'api-building/build-from-dbt',
    //     },
    //     {
    //       type: 'category',
    //       label: 'API Validation',
    //       link: { type: 'doc', id: 'api-building/api-validation' },
    //       items: [
    //         {
    //           type: 'doc',
    //           id: 'api-building/api-validation/validation-filter',
    //         },
    //       ],
    //     },
    //     {
    //       type: 'doc',
    //       id: 'api-building/error-response',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'api-building/api-document',
    //     },
    //     {
    //       type: 'category',
    //       label: 'Access Control',
    //       link: { type: 'doc', id: 'api-building/access-control' },
    //       items: [
    //         {
    //           type: 'category',
    //           label: 'Authenticator',
    //           link: {
    //             type: 'doc',
    //             id: 'api-building/access-control/authenticator',
    //           },
    //           items: [
    //             {
    //               type: 'autogenerated',
    //               dirName: 'api-building/access-control/authenticators',
    //             },
    //           ],
    //         },
    //         {
    //           type: 'doc',
    //           id: 'api-building/access-control/authorization',
    //         },
    //       ],
    //     },
    //     {
    //       type: 'doc',
    //       id: 'api-building/api-versioning',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'api-building/access-log',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'api-building/cors',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'api-building/response-format',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'api-building/rate-limit',
    //     },
    //     {
    //       type: 'category',
    //       label: 'Pagination',
    //       link: { type: 'doc', id: 'api-building/pagination' },
    //       items: [
    //         {
    //           type: 'doc',
    //           id: 'api-building/pagination/offset',
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      type: 'html',
      value: '<img src="/img/deploy.svg" width="20em" class="menu_icon" /> Deployment and Maintenance',
      className: 'sidebar-title',
    },
    'deployment',
    // {
    //   type: 'category',
    //   label: 'Extensions',
    //   link: { type: 'doc', id: 'extensions' },
    //   items: [
    //     {
    //       type: 'doc',
    //       id: 'extensions/use-extension',
    //       label: 'Use Extension',
    //     },
    //     {
    //       type: 'category',
    //       label: 'Make Extension',
    //       link: { type: 'doc', id: 'extensions/make-extension' },
    //       items: [
    //         {
    //           type: 'category',
    //           label: '@vulcan-sql/core',
    //           link: { type: 'doc', id: 'extensions/vulcan-sql-core' },
    //           items: [
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-core/data-source',
    //               label: 'DataSource',
    //             },
    //             {
    //               type: 'category',
    //               label: 'Filter',
    //               link: { type: 'doc', id: 'extensions/vulcan-sql-core/filter' },
    //               items: [{
    //                 type: 'autogenerated',
    //                 dirName: 'extensions/vulcan-sql-core/filter',
    //               }]
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-core/input-validator',
    //               label: 'InputValidator',
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-core/persistent-store',
    //               label: 'PersistentStore',
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-core/profile-reader',
    //               label: 'ProfileReader',
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-core/serializer',
    //               label: 'Serializer',
    //             },
    //             {
    //               type: 'category',
    //               label: 'Tag',
    //               link: { type: 'doc', id: 'extensions/vulcan-sql-core/tag' },
    //               items: [{
    //                 type: 'autogenerated',
    //                 dirName: 'extensions/vulcan-sql-core/tag',
    //               },]
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-core/template-provider',
    //               label: 'TemplateProvider',
    //             },
    //           ],
    //         },
    //         {
    //           type: 'category',
    //           label: '@vulcan-sql/build',
    //           link: { type: 'doc', id: 'extensions/vulcan-sql-build' },
    //           items: [
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-build/packager',
    //               label: 'Packager',
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-build/schema-reader',
    //               label: 'SchemaReader',
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-build/spec-generator',
    //               label: 'SpecGenerator',
    //             },
    //           ],
    //         },
    //         {
    //           type: 'category',
    //           label: '@vulcan-sql/serve',
    //           link: { type: 'doc', id: 'extensions/vulcan-sql-serve' },
    //           items: [
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-serve/authenticator',
    //               label: 'BaseAuthenticator',
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-serve/document-router',
    //               label: 'DocumentRouter',
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-serve/response-formatter',
    //               label: 'BaseResponseFormatter',
    //             },
    //             {
    //               type: 'doc',
    //               id: 'extensions/vulcan-sql-serve/route-middleware',
    //               label: 'BaseRouteMiddleware',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       type: 'doc',
    //       id: 'extensions/test-extension',
    //       label: 'Test Extension',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'extensions/publish-extension',
    //       label: 'Publish Extension',
    //     },
    //   ],
    // },
    {
      type: 'html',
      value: '<br/><br/>',
    },
  ],
};

module.exports = sidebars;
