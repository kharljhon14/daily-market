import Button from '@/components/button/Button';
import InputField from '@/components/input/Input';
import Textarea from '@/components/textarea/Textarea';

interface Props {
  close: () => void;
}

export default function BrandForm({ close }: Props) {
  return (
    <form className="space-y-6">
      <div className="space-y-3">
        <InputField
          label="Name"
          name="brand_name"
        />
        <Textarea
          label="Description"
          name="description"
        />
      </div>
      <div className="flex justify-between">
        <Button
          onClick={close}
          type="button"
          buttonType="secondary"
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
