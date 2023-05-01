import { ReactNode } from 'react';

interface Props {
  text: string;
  icon?: ReactNode;
}

export default function NavItem({ text, icon }: Props) {
  return (
    <div className="w-full p-5 text-center font-semibold uppercase">
      <div className="flex items-center pl-10 space-x-3 text-lg">
        {icon}
        <h1>{text}</h1>
      </div>
    </div>
  );
}
