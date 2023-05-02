import classnames from 'classnames';
import { HTMLInputTypeAttribute } from 'react';

interface Props {
  placeholder?: string;
  classNames?: string;
  type?: Extract<HTMLInputTypeAttribute, 'search' | 'text' | 'number'>;
}

export default function InputField({
  placeholder,
  classNames,
  type = 'text',
}: Props) {
  const baseStyle =
    'p-2 border-2 border-dark_grey rounded-lg block pl-6 outline outline-offset-2 outline-transparent focus:border-light_grey focus:ring-dark_blue focus:ring-2';
  const combinedStyles = classnames(baseStyle, classNames);

  return (
    <input
      className={combinedStyles}
      type={type}
      placeholder={placeholder}
    />
  );
}
