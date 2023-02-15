# React `styled` helper for [classname-variants](https://github.com/fgnass/classname-variants/)

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

This package replaces the classname-variants/react `styled` helper.

Main differences:

- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot) is used instead of polymorphic (`as` prop) components.
- Correct implementation of `VariantProps` utility type that only returns variant props of react component
- Ability to extract the `classname-variants` configuration from a react component using the `extractStyledConfig` function

## Install

```bash
npm install react-classname-variants
```

## Usage

wip...

[build-img]: https://github.com/jackardios/react-classname-variants/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/jackardios/react-classname-variants/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/react-classname-variants
[downloads-url]: https://www.npmtrends.com/react-classname-variants
[npm-img]: https://img.shields.io/npm/v/react-classname-variants
[npm-url]: https://www.npmjs.com/package/react-classname-variants
[issues-img]: https://img.shields.io/github/issues/jackardios/react-classname-variants
[issues-url]: https://github.com/jackardios/react-classname-variants/issues
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
