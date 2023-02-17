# react-classname-variants

[![npm package][npm-img]][npm-url]
[![npm bundle size][bundle-size-img]][bundle-size-url]
[![Downloads][downloads-img]][downloads-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

This is a helper for creating a react components with [Stitches-like](https://github.com/stitchesjs/stitches) variants using [classname-variants](https://github.com/fgnass/classname-variants) under the hood.

## Features:

- Lightweight (1.2Kb minzipped)
- Fully type-safe
- [Stitches-like](https://github.com/stitchesjs/stitches) variants API

### Main differences from [classname-variants/react](https://github.com/fgnass/classname-variants#bonus-styled-components-but-for-static-css-):

- Instead of polymorphism (`as` prop), this package uses [@radix-ui/react-slot](https://www.radix-ui.com/docs/primitives/utilities/slot) (`asChild` prop) which concatenates its props with its immediate child
- Correct implementation of `VariantPropsOf` utility type that only returns variant props of react component
- Ability to extract the configuration from a `styled` react component using the `extractVariantsConfig` function

## Install

```bash
npm install react-classname-variants
```

## Usage

Things can be taken even a step further, resulting in a _styled-components_ like way of defining reusable components. Under the hood, this does basically the same as the example above, but also handles _refs_ correctly:

```ts
import { styled, tw } from 'react-classname-variants';
const Button = styled('button', {
  variants: {
    size: {
      small: tw`text-xs px-4`,
      large: tw`text-base px-6`,
    },
  },
});
```

Again, this is not limited to tailwind, so you could do the same with CSS modules:

```ts
import { styled } from 'react-classname-variants';
import styles from './styles.module.css';
const Button = styled('button', {
  variants: {
    size: {
      small: styles.small,
      large: styles.large,
    },
  },
});
```

You can also use the `VariantPropsOf` utility type to get the prop type for variants only:

```ts
import { VariantPropsOf, styled, tw } from 'react-classname-variants';

const Button = styled('button', {
  base: tw`px-5 py-2 text-white disabled:bg-gray-400 disabled:text-gray-300`,
  variants: {
    color: {
      neutral: tw`bg-slate-500 hover:bg-slate-400`,
      accent: tw`bg-teal-500 hover:bg-teal-400`,
    },
    outlined: {
      true: tw`border-2`,
    },
    size: {
      small: tw`text-xs px-4`,
      large: tw`text-base px-6`,
    },
  },
  compoundVariants: [
    {
      variants: { color: 'accent', outlined: true },
      className: tw`border-teal-600`,
    },
  ],
  defaultVariants: {
    size: 'small',
  },
});

type ButtonProps = VariantPropsOf<typeof Button>;
// is equivalent to this:
type ButtonProps = {
  color: 'neutral' | 'accent';
  outlined: boolean | undefined; // boolean properties can be undefined
  size: 'small' | 'large' | undefined; // can be undefined because it has a default variant
};
```

> **Note**
> You can also style other custom React components as long as they accept a `className` prop.

## Styled components without variants

You can also use the `styled` function to create styled components without any variants at all:

```ts
import { styled } from 'react-classname-variants';
const Button = styled(
  'button',
  'border-none rounded px-3 font-sans bg-green-600 text-white hover:bg-green-500'
);
```

## Polymorphic components with "asChild"

If you want to keep all the variants you have defined for a component but want to render a different HTML tag or a different custom component, you can use the "asChild" prop to do so:

```tsx
import { styled } from 'react-classname-variants';
const Button = styled('button', {
  variants: {
    //...
  },
});
function App() {
  return (
    <div>
      <Button>I'm a button</Button>
      <Button asChild>
        <a href="/">I'm a link!</a>
      </Button>
    </div>
  );
}
```

# Tailwind IntelliSense

In order to get auto-completion for the CSS classes themselves, you can use the [Tailwind CSS IntelliSense](https://github.com/tailwindlabs/tailwindcss-intellisense) plugin for VS Code. In order to make it recognize the strings inside your variants-config, you have to somehow mark them and configure the plugin accordingly.

One way of doing so is by using tagged template literals:

```ts
import { variants, tw } from 'cvariants';
const Button = styled('button', {
  base: tw`px-5 py-2 text-white`,
  variants: {
    color: {
      neutral: tw`bg-slate-500 hover:bg-slate-400`,
      accent: tw`bg-teal-500 hover:bg-teal-400`,
    },
  },
});
```

You can then add the following line to your `settings.json`:

```
"tailwindCSS.experimental.classRegex": ["tw`(\\`|[^`]+?)`"]
```

> **Note**
> The `tw` helper function is just an alias for [`String.raw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw).
> In order to get type coverage even for your Tailwind classes you can use a tool like [tailwind-ts](https://github.com/mathieutu/tailwind-ts).

# License

MIT

[npm-img]: https://img.shields.io/npm/v/react-classname-variants
[npm-url]: https://www.npmjs.com/package/react-classname-variants
[bundle-size-img]: https://img.shields.io/bundlephobia/minzip/react-classname-variants
[bundle-size-url]: https://bundlephobia.com/package/react-classname-variants
[downloads-img]: https://img.shields.io/npm/dt/react-classname-variants
[downloads-url]: https://www.npmtrends.com/react-classname-variants
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
