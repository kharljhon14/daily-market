import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/button/Button';
import InputField from '@/components/input/Input';
import Textarea from '@/components/textarea/Textarea';
import { BrandSchema, BrandSchemaType } from '@/schemas/admin/brand';
import Modal from '@/components/modal/Modal';
import agent from '@/utils/agent';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface Props {
  close: () => void;
  open: boolean;
}

export default function BrandForm({ close, open }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandSchemaType>({ resolver: zodResolver(BrandSchema) });

  const onClose = () => {
    close();
    reset();
  };

  const onSubmit: SubmitHandler<BrandSchemaType> = async (values) => {
    try {
      const { message } = await agent.brand
        .create(values)
        .catch((err) => toast.error(err));
      toast.success(message);
      onClose();
    } catch (err) {
      if (err instanceof AxiosError) toast.error(err.message);
    }
  };

  return (
    <Modal
      title="Add Brand"
      open={open}
      close={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-3">
          <InputField
            label="Name"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <Textarea
            label="Description"
            name="description"
            register={register}
            error={errors.description?.message}
          />
        </div>
        <div className="flex justify-between">
          <Button
            onClick={onClose}
            type="button"
            buttonType="secondary"
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
