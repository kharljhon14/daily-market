import { MouseEventHandler, ReactNode } from 'react';

const buttonStyles = {
  primary:
    'bg-light_blue text-white hover:bg-light_accent disabled:hover:bg-light_blue',
  secondary:
    'border-2 border-dark_blue hover:bg-dark_blue hover:text-white disabled:hover:bg-transparent  disabled:hover:text-dark_blue',
  error: 'bg-red-600 text-white hover:bg-red-500 disabled:hover:bg-red-600',
};

interface Props {
  children?: ReactNode | ReactNode[] | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  buttonType?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  buttonType = 'primary',
  disabled,
  loading,
}: Props) {
  return (
    <button
      className={`min-w-[2rem] p-2 rounded uppercase font-semibold duration-200 ${buttonStyles[buttonType]} disabled:cursor-progress disabled:opacity-50`}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
}
