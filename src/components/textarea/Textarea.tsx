interface Props {
  label?: string;
  name?: string;
  placeholder?: string;
}

export default function Textarea({ label, name, placeholder }: Props) {
  return (
    <div className="flex w-full flex-col">
      <label
        className="text-dark_blue text-lg font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        rows={8}
        placeholder={placeholder}
        className=" resize-none text-dark_blue w-full p-2 border-2 border-dark_grey rounded-lg block pl-6 outline outline-offset-2 outline-transparent focus:border-light_grey focus:ring-dark_blue focus:ring-2"
        name={name}
        id={name}
      />
    </div>
  );
}
