import classnames from 'classnames';
import { HTMLInputTypeAttribute } from 'react';

interface Props {
  label?: string;
  name: string;
  placeholder?: string;
  classNames?: string;
  type?: Extract<HTMLInputTypeAttribute, 'search' | 'text' | 'number'>;
  register: any;
  error?: string;
}

export default function InputField({
  label,
  name,
  placeholder,
  classNames,
  type = 'text',
  register,
  error,
}: Props) {
  const baseStyle = `${
    error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-dark_grey focus:ring-dark_blue'
  } py-2 border-2  rounded-lg block px-6 outline outline-offset-2 outline-transparent focus:border-light_grey  focus:ring-2`;
  const combinedStyles = classnames(baseStyle, classNames);

  return (
    <div className="flex w-full flex-col">
      <label
        className={`${
          error ? 'text-red-500' : 'text-dark_blue'
        }  text-lg font-semibold`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        className={combinedStyles}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />

      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
}
