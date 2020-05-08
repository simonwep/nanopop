<h3 align="center">
    <img src="https://user-images.githubusercontent.com/30767528/81419142-155b4100-914e-11ea-913b-cb9f0cccd4e2.png" width="500" alt="Logo">
</h3>

<h3 align="center">
    Ultra Tiny, Opinionated Positioning Engine
</h3>

<p align="center">
  <img alt="gzip size" src="https://img.badgesize.io/https://cdn.jsdelivr.net/npm/nanopop/lib/nanopop.min.mjs?compression=gzip&style=flat-square">
  <img alt="brotli size" src="https://img.badgesize.io/https://cdn.jsdelivr.net/npm/nanopop/lib/nanopop.min.mjs?compression=brotli&style=flat-square">
  <a href="https://github.com/Simonwep/nanopop/actions"><img
     alt="Build Status"
     src="https://img.shields.io/github/workflow/status/Simonwep/nanopop/CI?style=flat-square"/></a>
  <a href="https://www.npmjs.com/package/nanopop"><img
     alt="Download count"
     src="https://img.shields.io/npm/dm/nanopop.svg?style=popout-square"></a>
  <img alt="No dependencies" src="https://img.shields.io/badge/dependencies-none-27ae60.svg?style=popout-square">
  <a href="https://www.jsdelivr.com/package/npm/nanopop"><img
     alt="JSDelivr download count"
     src="https://data.jsdelivr.com/v1/package/npm/nanopop/badge"></a>
  <img alt="Current version"
       src="https://img.shields.io/github/tag/Simonwep/nanopop.svg?color=3498DB&label=version&style=flat-square">
  <a href="https://github.com/sponsors/Simonwep"><img
     alt="Support me"
     src="https://img.shields.io/badge/github-support-3498DB.svg?style=popout-square"></a>
</p>

<br>


NanoPop is an ultra-tiny positioning engine. But **wait** isn't there [PopperJS](https://github.com/popperjs/popper-core)? Yeah - and PopperJS is great! But there are tons of features
you might not need in most cases. This library is _brotlied_ only ~ 700 Bytes (PopperJS is around 3kB).

## Getting Started
6
Install via npm:
```shell
$ npm install nanopop
```

Install via yarn:
```shell
$ yarn add nanopop
```

Include directly via jsdelivr:
```html
<script src="https://cdn.jsdelivr.net/npm/nanopop/lib/nanopop.min.js"></script>
```

Using [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules):

````js
import {NanoPop} from 'https://cdn.jsdelivr.net/npm/nanopop/lib/nanopop.min.mjs'
````


## Usage

```js
const reference = document.querySelector('.btn');
const popper = document.querySelector('.dropdown');
const nanopop = new NanoPop(reference, popper);

// Updating the popper-position
nanopop.update();
```


##### All options
```js
const nanopop = new NanoPop(reference, popper, {

    // Margin between the popper element and the reference
    margin: 8,

    // Preferred position, any combination of [top|right|bottom|left]-[start|middle|end] is valid.
    position: 'bottom-start',

    // Sometimes there's no way to position the popper element without clipping it.
    // Turn this on if you want to apply the latest tried values to the popper element.
    // The .update() function will return false in any case it fails so you can handle this separately.
    forceApplyOnFailure: false,

    // In case the variant-part (start, middle or end) cannot be applied you can specify what (and if)
    // should be tried next.
    variantFlipOrder: {
        start: 'sme', // In case of -start try 'start' first, if that fails 'middle' and 'end' if both doesn't work.
        middle: 'mse',
        end: 'ems'
    },

    // The same as variantFlipOrder, but if all variants fail you might want to try other positions.
    positionFlipOrder: {
        top: 'tbrl', // Try 'top' first, 'bottom' second, 'right' third and 'left' as latest position.
        right: 'rltb',
        bottom: 'btrl',
        left: 'lrbt'
    }
});
```

### Functions
* `nanopop.update(Partial<Options>)` _- Update the position and optionally update the options of this nanopop instance._

### Properties
* `nanopop.version` _- Current version._

### Caveats
1. `window` is (currently) the only bounding-element supported.
2. The library does not perform any automatic updates if the window gets resized, or the user scrolls, you have to take care of that
yourself and call `update()` in the case.
