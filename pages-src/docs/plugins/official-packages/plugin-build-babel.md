# @lerna-cola/plugin-build-babel

A [build](#build) command plugin.

This plugin will transpile your package's `srcDir` (see the [configuration](#configuration)) using [Babel](https://babeljs.io), outputing the results into your packages `outputDir` (see the [configuration](#configuration)).

By default it will use a `.babelrc` found within your packages root directory, and if one is not found then it will look for a `.babelrc` within the root of your monorepo. You can alternatively provide a babel configuration via the plugin's options.

**Options**

This plugin supports the following options:

- `config` (_string_ || _Object_, **optional**)

  The [babel configuration](https://babeljs.io/docs/en/api.md) to use for the transpilation.

  This can be one of two things:

  - The name of a package where the main export is a babel configuration object.
  - An object containing the babel configuration.

  > Note: Lerna Cola ships a simple babel config package which you could use. It is called `@lerna-cola/babel-config`

We highly recommend that you enable sourcemaps output within your configuration to aid debugging.

**Example**

Specifying an inline config:

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-lib': {
      buildPlugin: {
        name: '@lerna-cola/plugin-build-babel',
        options: {
          config: {
            presets: ['babel-preset-env'],
          },
        },
      },
    },
  },
}
```

Specifying a package containing the configuration:

```javascript
// lerna-cola.js
module.exports = {
  packages: {
    'my-lib': {
      buildPlugin: {
        name: '@lerna-cola/plugin-build-babel',
        options: {
          config: 'my-babel-config-package',
        },
      },
    },
  },
}
```
