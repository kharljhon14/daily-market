import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
import useModal from '@/hooks/useModal';
import { ReactNode, useState } from 'react';

interface Props {
  deleteBy: string;
  title?: string | ReactNode;
  name: string;
  deleteFunction: (id: string) => void;
}

export default function DeleteModal({
  deleteBy,
  title,
  name,
  deleteFunction,
}: Props) {
  const { open, handleClose, handleOpen } = useModal(false);

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteFunction(deleteBy);
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        buttonType="error"
      >
        Delete
      </Button>
      <Modal
        title={title}
        open={open}
        close={handleClose}
        width="30rem"
        loading={loading}
      >
        <div className="flex flex-col items-center justify-around h-40 text-center px-10">
          <h2 className="text-xl text-red-500 font-bold uppercase">{`Do you want to delete ${name}?`}</h2>
          <div className="flex justify-between w-full">
            <Button
              onClick={handleClose}
              buttonType="secondary"
              loading={loading}
            >
              cancel
            </Button>
            <Button
              onClick={handleDelete}
              buttonType="error"
              loading={loading}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
