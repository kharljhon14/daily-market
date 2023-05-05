import { AiOutlineClose } from 'react-icons/ai';

import { ReactNode } from 'react';

interface Props {
  title?: string | ReactNode;
  open?: boolean;
  close: () => void;
  children?: ReactNode | ReactNode[];
  footer?: ReactNode | ReactNode[];
  loading?: boolean;
  width?: string;
}

export default function Modal({
  title,
  open,
  close,
  children,
  footer,
  width,
  loading,
}: Props) {
  return (
    <div
      className={`${
        open ? 'scale-100' : 'scale-0'
      } fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center z-50 ${
        open ? 'delay-0' : 'delay-300'
      }`}
    >
      <div
        className={`${
          open ? 'scale-100' : 'scale-0'
        }  bg-white max-h-[90vh] p-4 rounded-md  w-full shadow-md overflow-hidden transition-all duration-300 `}
        style={{ maxWidth: width || '50rem' }}
      >
        <div
          className={`flex items-center ${
            title ? 'justify-between' : 'justify-end'
          } w-full mb-6`}
        >
          <h1 className="text-2xl text-dark_blue font-semibold">{title}</h1>
          <button
            onClick={close}
            type="button"
            className="text-3xl text-dark_blue"
            disabled={loading}
          >
            <AiOutlineClose />
          </button>
        </div>
        {children}
        <div className="mt-6">{footer}</div>
      </div>
    </div>
  );
}
