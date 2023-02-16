import React, { createRef, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import {
  extractVariantsConfig,
  styled,
  VariantPropsOf,
  VariantsConfigOf,
} from '../src';

interface CustomComponentProps {
  className?: string;
  title: string;
}
const CustomComponent = forwardRef<HTMLDivElement, CustomComponentProps>(
  ({ title, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {title}
      </div>
    );
  }
);

interface DeepComponentProps extends CustomComponentProps {
  pre?: 'foo' | 'bar';
}

const DeepComponent = forwardRef<HTMLDivElement, DeepComponentProps>(
  ({ pre, title, ...props }, ref) => {
    return <CustomComponent {...props} title={(pre || '') + title} ref={ref} />;
  }
);

// ------------------------------------------------------

const Card = styled('div', 'bg-white p-4 border-2 rounded-lg');

type CardVariantConfig = VariantsConfigOf<typeof Card>;
type CardVariantProps = VariantPropsOf<typeof Card>;
console.log(extractVariantsConfig(Card));

// ------------------------------------------------------

const TitleCard = styled(DeepComponent, 'bg-white p-4 border-2 rounded-lg');

type TitleCardVariantConfig = VariantsConfigOf<typeof TitleCard>;
type TitleCardVariantProps = VariantPropsOf<typeof TitleCard>;
console.log(extractVariantsConfig(TitleCard));

// ------------------------------------------------------

const Button = styled('button', {
  base: 'px-5 py-2 text-white disabled:bg-gray-400 disabled:text-gray-300',
  variants: {
    color: {
      neutral: 'bg-slate-500 hover:bg-slate-400',
      accent: 'bg-teal-500 hover:bg-teal-400',
    },
    outlined: {
      true: 'border-2',
    },
    size: {
      small: 'text-xs px-4',
      large: 'text-base px-6',
    },
  },
  compoundVariants: [
    {
      variants: { color: 'accent', outlined: true },
      className: 'border-teal-600',
    },
  ],
  defaultVariants: {
    size: 'small',
  },
});

type ButtonVariantConfig = VariantsConfigOf<typeof Button>;
type ButtonVariantProps = VariantPropsOf<typeof Button>;

console.log(extractVariantsConfig(Button));

// ------------------------------------------------------

export const ExpectErrors = styled('div', {
  variants: {
    color: {
      neutral: 'grey',
      accent: 'hotpink',
    },
  },
  compoundVariants: [
    {
      //@ts-expect-error
      variants: { outlined: true },
      className: '',
    },
  ],
  defaultVariants: {
    //@ts-expect-error
    outlined: true,
  },
});

// ------------------------------------------------------

export function WithErrors() {
  const divRef = createRef<HTMLDivElement>();

  return (
    <div>
      {/* @ts-expect-error */}
      <Button color="accent" foo>
        Unknown property
      </Button>

      {/* @ts-expect-error */}
      <Button color="accent" ref={divRef}>
        Invalid ref
      </Button>

      {/* @ts-expect-error */}
      <Card foo>Unknown property</Card>

      {/* @ts-expect-error */}
      <Button color="foo">Invalid color</Button>

      {/* @ts-expect-error */}
      <Button>Missing required color property</Button>

      {/* @ts-expect-error */}
      <Card href="https://example.com">B tags don't have a href attribute</Card>
    </div>
  );
}

function App() {
  const buttonRef = createRef<HTMLButtonElement>();
  const divRef = createRef<HTMLDivElement>();

  return (
    <div className="flex justify-center items-center pt-8 gap-4 flex-wrap">
      <Button color="neutral" onClick={console.log}>
        Neutral
      </Button>
      <Button color="neutral" size="large">
        Neutral + Large
      </Button>
      <Button color="accent" outlined ref={buttonRef}>
        Accent + Outlined
      </Button>
      <Button color="accent" disabled>
        Accent + Disabled
      </Button>
      <TitleCard pre="foo" title="Hello" ref={divRef} />
      <Card>
        <h1>Hello</h1>
        <p>world</p>
      </Card>
      <Card asChild>
        <a href="https://example.com" className="py-2">
          Link
        </a>
      </Card>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
