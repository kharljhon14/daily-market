import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import InputField from '../input/Input';
import Button from '../button/Button';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const [openContent, setOpenContent] = useState(true);

  const handleClose = () => {
    setOpenContent(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  const handleOpen = () => {
    setOpenContent(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 500);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 ${
        isOpen ? 'flex' : 'hidden'
      } items-center justify-center`}
    >
      <Button
        onClick={handleOpen}
        type="button"
      >
        test
      </Button>
      <div
        className="bg-white max-h-[90vh] p-4 rounded-md max-w-[50rem] w-full shadow-md overflow-hidden transition-all duration-500"
        style={{
          scale: openContent ? '1' : '0',
        }}
      >
        <button
          onClick={handleClose}
          type="button"
          className="float-right text-3xl text-dark_blue"
        >
          <AiOutlineClose />
        </button>
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <InputField />
      </div>
    </div>
  );
}
