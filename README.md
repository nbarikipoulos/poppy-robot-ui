# Poppy Robot UI

![GitHub package.json version][version-img]
[![JavaScript Style Guide][standard-image]][standard-url]
[![Language grade: JavaScript][lgtm-image]][lgtm-url]

Responsive web app to monitor/control robots of the [Poppy project][poppy-project-url] family based on Vue.js and the [poppy-robot-core](https://github.com/nbarikipoulos/poppy-robot-core#readme) module.

It allows:
- Displaying register of interest of motors of a Poppy robot (at least a Poppy Ergo Jr.),
- Settings compliant/stiff state, speed, position and led (for XL-320 motor).

![view](./doc/display.png "Display on mobile/PC")

A demonstration video is available [here](https://www.youtube.com/watch?v=vkAI09Vu6qc).

<!-- toc -->

- [Screenshots](#screenshots)
  * [Wide Screens](#wide-screens)
  * [Mobile Devices](#mobile-devices)
- [Prerequisite](#prerequisite)
- [Install](#install)
- [Build](#build)
- [Versioning](#versioning)
- [Known Limitations](#known-limitations)
- [Credits](#credits)
- [License](#license)

<!-- tocstop -->

## Screenshots

### Wide Screens

![dashboard](./doc/dashboard-wide.png "Dashboard (rendering on 'wide screen')")

![dashboard](./doc/dashboard-card-wide.png "Dashboard (rendering motor as card on 'wide screen')")

### Mobile Devices

![dashboard](./doc/dashboard-mobile.png "Dashboard (rendering on mobile)")

## Prerequisite

Communication with the robot is done using the __pypot REST API v4.0.0__ aka target robot must embed the __Poppy software ^v4.0.0__.

## Install

Download the latest build available on this [page](https://github.com/nbarikipoulos/poppy-robot-ui/releases/latest) and unzip it.

Then just serve it.

As example with the serve npm package:

```shell
npx serve dist
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

## Build

Once the project has been cloned, type

```shell
npm i
npm run build
```

## Versioning

While it's still in beta, version will follow v0.Y.Z, where:
- Y: Major,
- Z: Minor or patch.

## Known Limitations

- __This module has been only tested with sets of dynamixel XL-320__ (then for the __Poppy Ergo Jr__). As it communicates with the robot via the REST API of the pypot library, it should be usable with any robot of the poppy family.

## Credits

- Nicolas Barriquand ([nbarikipoulos](https://github.com/nbarikipoulos))

## License

The poppy-robot-ui is MIT licensed (details available [here](./LICENSE.md)) except for:
  - The poppy logo which is under [CC BY-SA 4.0][cc-by-sa-url] (see [here][poppy-project-url]).


[standard-url]: https://standardjs.com
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg

[version-img]: https://img.shields.io/github/package-json/v/nbarikipoulos/poppy-robot-ui

[lgtm-url]: https://lgtm.com/projects/g/nbarikipoulos/poppy-robot-ui
[lgtm-image]: https://img.shields.io/lgtm/grade/javascript/g/nbarikipoulos/poppy-robot-ui.svg?logo=lgtm&logoWidth=18

[cc-by-sa-url]: https://creativecommons.org/licenses/by-sa/4.0/
[poppy-project-url]: https://www.poppy-project.org