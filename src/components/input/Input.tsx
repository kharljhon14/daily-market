import classnames from 'classnames';
import { HTMLInputTypeAttribute } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  label?: string;
  name: string;
  placeholder?: string;
  classNames?: string;
  type?: Extract<HTMLInputTypeAttribute, 'search' | 'text' | 'number'>;
  disabled?: boolean;
  loading?: boolean;
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
  loading = false,
  disabled,
}: Props) {
  const baseStyle = `${
    error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-dark_grey focus:ring-dark_blue'
  } py-2 border-2  rounded-lg block px-6 outline outline-offset-2 outline-transparent focus:border-light_grey  focus:ring-2 disabled:bg-light_grey`;
  const combinedStyles = classnames(baseStyle, classNames);

  return (
    <div className="flex w-full flex-col relative">
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
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)}
      />
      <div className="absolute top-10 right-2">
        <ClipLoader
          size={24}
          color="#4CC3DB"
          loading={loading}
        />
      </div>

      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
}
