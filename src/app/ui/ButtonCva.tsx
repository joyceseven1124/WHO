//Button.tsx

import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(
  [
    'rounded',
    'border',
    'py-2',
    'whitespace-nowrap',
    'transition',
    'duration-300',
    'ease-in-out',
    'hover:text-white',
    'focus:outline-none',
  ],
  {
    variants: {
      intent: {
        // 無背景色 ＋ 黑框 ＋ 黑字
        primary: [
          'bg-transparent',
          'text-black',
          'border-gray-800',
          'hover:bg-gray-900',
        ],

        // 背景色黑 ＋ 黑框 ＋ 白字
        secondary: [
          'bg-gray-950',
          'text-white',
          'border-gray-800',
          'hover:bg-gray-800',
        ],

        // 淺灰框 ＋ 白字＋ hover時白框
        third: [
          'bg-transparent',
          'text-white',
          'border-gray-600',
          'hover: bg-transparent',
          'hover: border-white',
        ],

        danger: ['bg-red-500'],
        disable: ['bg-gray-500'],
      },
      size: {
        sm: ['px-3 text-sm'],
        md: ['px-5 text-base'],
        lg: ['px-6 text-base'],
      },

      btnType: {
        normal: '',
        icon: ['flex', 'gap-x-4'],
      },
    },

    defaultVariants: {
      intent: 'primary',
      size: 'md',
      btnType: 'normal',
    },
  }
);

type buttonType = VariantProps<typeof buttonStyles> & ComponentProps<'button'>;

const ButtonCva = ({
  intent,
  size,
  btnType,
  className,
  ...props
}: buttonType) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ intent, size, btnType }), className)}
    />
  );
};

export default ButtonCva;
