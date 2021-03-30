# nuxt-socketi-js

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Socketi.js for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)



This is a fork from @nuxtjs/laravel-echo to work with https://github.com/soketi/echo-server
## Requirements

If you use the broadcaster `pusher`, you need to ensure that you have `pusher-js` installed:

```bash
yarn add pusher-js # or npm install pusher-js
```

If you use the broadcaster `socket.io`, you need to ensure that you have `socket.io-client` installed:

```bash
yarn add socket.io-client # or npm install socket.io-client
```

## Setup

1. Add `nuxt-socketi-js` dependency to your project

```bash
yarn add --dev nuxt-socketi-js # or npm install --save-dev nuxt-socketi-js
```

2. Add `nuxt-socketi-js` to the `buildModules` section of `nuxt.config.js`

```js
export default {
  buildModules: [
    // Simple usage
    'nuxt-socketi-js',

    // With options
    ['nuxt-socketi-js', { /* module options */ }]
  ]
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--dev` or `--save-dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

### Using top level options

```js
export default {
  buildModules: [
    'nuxt-socketi-js'
  ],
  socketi: {
    /* module options */
  }
}
```

## Options

### `broadcaster`

- Type: `String`
- Default: `'null'`

You can use `'pusher'`, `'socket.io'` or `'null'`.

See [https://laravel.com/docs/broadcasting#driver-prerequisites](https://laravel.com/docs/broadcasting#driver-prerequisites)

### `plugins`

- Type: `Array`
- Default: `null`

If you have plugins that need to access `$echo`, you can use `echo.plugins` option.

> **Note:** Plugins are pushed in client mode only (`ssr: false`).

`nuxt.config.js`

```js
export default {
  buildModules: [
    'nuxt-socketi-js'
  ],
  echo: {
     plugins: [ '~/plugins/socketi.js' ]
  }
}
```

`plugins/echo.js`

```js
export default function ({ $socketi }) {
  // Echo is available here
  console.log($socketi)
}
```

### `authModule`

- Type: `Boolean`
- Default: `false`

Integration with [Auth Module](https://github.com/nuxt-community/auth-module).

### `connectOnLogin`

- Type: `Boolean`
- Default: `false`

Connect the connector on login, if `authModule` is set `true`.

### `disconnectOnLogout`

- Type: `Boolean`
- Default: `false`

Disconnect the connector on logout, if `authModule` is set `true`.

## Usage

This module inject `$echo` to your project:

```html
<template>
  <div>
    <h1>Orders</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$socketi.channel('orders')
      .listen('OrderShipped', (e) => {
          console.log(e.order.name);
      });
  }
}
</script>
```

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-socketi-js/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-socketi-js

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-socketi-js.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-socketi-js

[github-actions-ci-src]: https://github.com/nuxt-community/socketi-js/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/socketi-js/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/socketi-js.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/socketi-js

[license-src]: https://img.shields.io/npm/l/nuxt-socketi-js.svg
[license-href]: https://npmjs.com/package/nuxt-socketi-js
