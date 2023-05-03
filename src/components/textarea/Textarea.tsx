import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  label?: string;
  name: string;
  placeholder?: string;
  register: any;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function Textarea({
  label,
  name,
  placeholder,
  register,
  error,
  disabled,
  loading = false,
}: Props) {
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
      <textarea
        rows={8}
        placeholder={placeholder}
        className={`${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-dark_grey focus:ring-dark_blue'
        } py-2 border-2  rounded-lg block px-6 outline outline-offset-2 outline-transparent focus:border-light_grey  focus:ring-2 resize-none disabled:bg-light_grey`}
        id={name}
        disabled={disabled}
        {...register(name)}
      />

      <div className="absolute top-9 right-2">
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
