# Poppy Robot UI

[![JavaScript Style Guide][standard-image]][standard-url]


A quick'n'dirty responsive dashboard/control for Poppy/Poppy Ergo Jr Robot based on Vue.js and the [poppy-robot-core](https://github.com/nbarikipoulos/poppy-robot-core) module.

![motor control](./doc/control-mobile.png "Motor control ( rendering on mobile)")

## Install

### Build Project

The build process is based on vueJS cli tooling that requires node.js (basic installation could be found [here](https://github.com/nbarikipoulos/poppy-robot-cli#installing-nodejs) if needed.)

- Clone this repository anywhere on your computer:

```shell
git clone https://github.com/nbarikipoulos/poppy-robot-ui.git
```

- Open a terminal in this folder and type:

```shell
npm install
npm run build // Compiles and minifies for production in dist/
```

And then serve it with any http server (below with the serve npm package):
```shell
npm run serve-dist
┌──────────────────────────────────────────────────┐
│                                                  │
│   Serving!                                       │
│                                                  │
│   - Local:            http://localhost:5000      │
│   - On Your Network:  http://192.168.1.14:5000   │
│                                                  │
│   Copied local address to clipboard!             │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Credits

- Nicolas Barriquand ([nbarikipoulos](https://github.com/nbarikipoulos))

## License

The poppy-robot-ui is MIT licensed. See [LICENSE](./LICENSE.md).

[standard-url]: https://standardjs.com
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg