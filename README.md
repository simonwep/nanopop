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

NanoPop is an ultra-tiny positioning engine. But **wait** isn't there [PopperJS](https://github.com/popperjs/popper-core)? Yeah - and PopperJS is great! But there are tons of features you might not need in most cases. This library is brotlied only ~ 700 Bytes (PopperJS is around 3kB).

#### What are the use-cases compared to PopperJS?
1. Situations where you want **full controll** over positioning, including handling events such as scrolling / resize manually.
2. **Performance-critical** cases with lots of elements [...] nanopop will only makes changes if you say so.
3. Poppers with **minimal footprint** such as drop-downs and tooltips which don't require much configurability.
4. You might have some special needs about how your popper behaves. NanoPop could be used as super-class and you can, based on what's required, extend NanoPop as you will :)

This library was originally part of [pickr](https://github.com/Simonwep/pickr) - now ported to TS with tests and a few updates / bug-fixes.

## Getting Started

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

> The popper-element must have set `position` to `fixed`.

#### All options
```js
const nanopop = new NanoPop(reference, popper, {

    // The DOMRect of the container, this is the default:
    container: document.documentElement.getBoundingClientRect(),

    // Margin between the popper element and the reference
    margin: 8,

    // Preferred position, any combination of [top|right|bottom|left]-[start|middle|end] is valid.
    position: 'bottom-start',

    // Sometimes there's no way to position the popper element without clipping it.
    // Turn this on if, in case there's no non-clipping position, want to apply the wanted position forcefully.
    // The .update() function will return false in any case it fails so you can handle this separately.
    // Attention: If this is set to false and you do not take care about handling the clipped element yourself it'll be positioned on the top-left corner of the container-element (most of the time this is the document element itself).
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
* `nanopop.update(newOptions?: Partial<Options>)` _- Update the position and optionally update the options of this NanoPop instance.
It'll return a position-pair (For example `te` for **T**op-**E**nd) or `null` based on if it was possible to find a position for the popper without clipping it._

> Tip: The returned position-pair is perfect for tool-tips to give them a little arrow!

### Properties
* `nanopop.version` _- Current version._

These are static default-values used in case you're not specifying something else:
* `NanoPop.defaultVariantFlipOrder` _- Default `variantFlipOrder` values._
* `NanoPop.defaultPositionFlipOrder` _- Default `positionFlipOrder`._

### Caveats
1. The popper-element must have `position` set to `fixed`.
2. ~~`window` is (currently) the only bounding-element supported.~~
3. The library does not perform any automatic updates if the window gets resized, or the user scrolls, you have to take care of that
yourself and call `update()` in the case.
4. You might have to fiddle around with `z-index` to make it work inside of complex, nested, scrollable containers.
