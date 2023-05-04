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

import { useEffect } from 'react';
import { BrandResponseType } from '@/types/brand';

interface Props {
  close: () => void;
  open: boolean;
  brandToEdit?: BrandResponseType;
}

export default function BrandForm({ close, open, brandToEdit }: Props) {
  const { selectedBrand, addBrand, updateBrand, setSelectedBrandToEdit } =
    useBrandContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BrandResponseType>({ resolver: zodResolver(BrandSchema) });

  const onClose = () => {
    close();
    reset();
    if (selectedBrand) setSelectedBrandToEdit(undefined);
  };

  const onSubmit: SubmitHandler<BrandSchemaType> = async (values) => {
    try {
      if (brandToEdit) {
        await agent.brand
          .update(brandToEdit._id, values)
          .then(({ data, message }) => {
            toast.success(message);
            updateBrand(data);
            onClose();
          })
          .catch((err) => toast.error(err.response.data.message));
      } else {
        await agent.brand
          .create(values)
          .then(({ data, message }) => {
            toast.success(message);
            addBrand(data);
            onClose();
          })
          .catch((err) => toast.error(err.response.data.message));
      }
    } catch (err) {
      if (err instanceof AxiosError) toast.error(err?.response?.data.message);
    }
  };

  useEffect(() => {
    if (brandToEdit) {
      Object.keys(brandToEdit).forEach((key) => {
        const fieldName = key as keyof typeof brandToEdit;
        setValue(fieldName, brandToEdit[fieldName]);
      });
    }
  }, [brandToEdit]);

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
