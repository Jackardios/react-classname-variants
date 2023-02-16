import {
  type ComponentProps,
  type ComponentRef,
  type ElementType,
  type ForwardRefExoticComponent,
  createElement,
  forwardRef,
} from 'react';

import {
  type Simplify,
  type Variants,
  type VariantsConfig,
  type VariantOptions,
  variants,
} from 'classname-variants';

import { Slot } from '@radix-ui/react-slot';

const StyledComponentConfigKey = '$$classnameVariantsConfig';

type StyledComponentConfigProp<Config> = {
  readonly [StyledComponentConfigKey]: Config;
};

export type StyledComponent<
  ForwardRefComponent extends ForwardRefExoticComponent<any>,
  Config
> = ForwardRefComponent & StyledComponentConfigProp<Config>;

export function createStyledPropsHandler<
  C extends VariantsConfig<V>,
  V extends Variants = C['variants']
>(config: Simplify<C>) {
  const variantClassName = variants(config);

  return <P extends VariantOptions<C> & { className?: string }>(props: P) => {
    const result: any = {};

    // Pass-through all unrelated props
    for (let prop in props) {
      if (!config.variants || !(prop in config.variants)) {
        result[prop] = props[prop];
      }
    }

    // Add the optionally passed className prop for chaining
    result.className = [props.className, variantClassName(props)]
      .filter(Boolean)
      .join(' ');

    return result as { className: string } & Omit<P, keyof C['variants']>;
  };
}

type VariantsOf<T, V> = T extends VariantsConfig ? V : {};

export function styled<
  T extends ElementType,
  C extends VariantsConfig<V>,
  V extends Variants = VariantsOf<C, C['variants']>
>(baseType: T, config: string | Simplify<C>) {
  const preparedConfig =
    typeof config === 'string'
      ? ({ base: config, variants: {} } as Simplify<C>)
      : config;

  const styledPropsHandler = createStyledPropsHandler(preparedConfig);

  type P = Omit<
    VariantOptions<C> & Omit<ComponentProps<T>, keyof VariantOptions<C>>,
    'asChild'
  > & {
    asChild?: boolean;
  };
  const component = forwardRef<ComponentRef<T>, P>(
    ({ asChild, ...props }, ref) => {
      const type = asChild ? Slot : baseType;

      return createElement(type, {
        ...styledPropsHandler(props as any),
        ref: ref as any,
      });
    }
  );

  return Object.assign(component, {
    [StyledComponentConfigKey]: preparedConfig,
  }) as StyledComponent<typeof component, typeof preparedConfig>;
}

export type VariantsConfigOf<Component> = Component extends StyledComponent<
  ForwardRefExoticComponent<any>,
  infer Config
>
  ? Config
  : never;

export type VariantPropsOf<Component> =
  VariantsConfigOf<Component> extends VariantsConfig
    ? VariantOptions<VariantsConfigOf<Component>>
    : {};

export function extractVariantsConfig<Component, Config>(
  styledComponent: Component & StyledComponentConfigProp<Config>
) {
  return styledComponent[StyledComponentConfigKey];
}

/**
 * No-op function to mark template literals as tailwind strings.
 */
export const tw = String.raw;
