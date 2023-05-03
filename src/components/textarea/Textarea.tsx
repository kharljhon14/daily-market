interface Props {
  label?: string;
  name: string;
  placeholder?: string;
  register: any;
  error?: string;
}

export default function Textarea({
  label,
  name,
  placeholder,
  register,
  error,
}: Props) {
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
      <textarea
        rows={8}
        placeholder={placeholder}
        className={`${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-dark_grey focus:ring-dark_blue'
        } py-2 border-2  rounded-lg block px-6 outline outline-offset-2 outline-transparent focus:border-light_grey  focus:ring-2 resize-none`}
        id={name}
        {...register(name)}
      />
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
}
