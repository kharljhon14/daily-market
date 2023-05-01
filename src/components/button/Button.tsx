import { MouseEventHandler, ReactNode } from 'react';

const buttonStyles = {
  primary: 'bg-light_blue text-white hover:bg-light_accent',
  secondary: 'border-2 border-dark_blue hover:bg-dark_blue hover:text-white',
  error: 'bg-red-600 text-white hover:bg-red-500',
};

interface Props {
  children?: ReactNode | ReactNode[] | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  buttonType?: 'primary' | 'secondary' | 'error';
}

export default function Button({
  children,
  onClick,
  type = 'button',
  buttonType = 'primary',
}: Props) {
  return (
    <button
      className={`min-w-[6rem] p-2 rounded uppercase font-semibold duration-200 ${buttonStyles[buttonType]}`}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {children}
    </button>
  );
}
