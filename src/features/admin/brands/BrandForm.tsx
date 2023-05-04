import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/button/Button';
import InputField from '@/components/input/Input';
import Textarea from '@/components/textarea/Textarea';
import { BrandSchema, BrandSchemaType } from '@/schemas/admin/brand';
import Modal from '@/components/modal/Modal';
import agent from '@/utils/agent';

import { toast } from 'react-toastify';
import { useBrandContext } from '@/context/BrandContext';
import { AxiosError } from 'axios';

interface Props {
  close: () => void;
  open: boolean;
}

export default function BrandForm({ close, open }: Props) {
  const { addBrand } = useBrandContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandSchemaType>({ resolver: zodResolver(BrandSchema) });

  const onClose = () => {
    close();
    reset();
  };

  const onSubmit: SubmitHandler<BrandSchemaType> = async (values) => {
    try {
      await agent.brand
        .create(values)
        .then(({ data, message }) => {
          toast.success(message);
          addBrand(data);
        })
        .catch((err) => toast.error(err.response.data.message));

      onClose();
    } catch (err) {
      if (err instanceof AxiosError) toast.error(err?.response?.data.message);
    }
  };

  return (
    <Modal
      title="Add Brand"
      open={open}
      close={onClose}
      loading={isSubmitting}
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
            disabled={isSubmitting}
            loading={isSubmitting}
          />
          <Textarea
            label="Description"
            name="description"
            register={register}
            error={errors.description?.message}
            disabled={isSubmitting}
            loading={isSubmitting}
          />
        </div>
        <div className="flex justify-between">
          <Button
            onClick={onClose}
            type="button"
            buttonType="secondary"
            loading={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
