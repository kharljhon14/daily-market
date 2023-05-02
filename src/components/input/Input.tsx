import classnames from 'classnames';
import { HTMLInputTypeAttribute } from 'react';

interface Props {
  label?: string;
  name?: string;
  placeholder?: string;
  classNames?: string;
  type?: Extract<HTMLInputTypeAttribute, 'search' | 'text' | 'number'>;
}

export default function InputField({
  label,
  name,
  placeholder,
  classNames,
  type = 'text',
}: Props) {
  const baseStyle =
    'p-2 border-2 border-dark_grey rounded-lg block pl-6 outline outline-offset-2 outline-transparent focus:border-light_grey focus:ring-dark_blue focus:ring-2';
  const combinedStyles = classnames(baseStyle, classNames);

  return (
    <div className="flex w-full flex-col">
      <label
        className="text-dark_blue text-lg font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={combinedStyles}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
