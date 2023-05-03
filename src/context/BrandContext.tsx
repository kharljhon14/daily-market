import { BrandSchemaType } from '@/schemas/admin/brand';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface BrandContextValue {
  brands: BrandSchemaType[];
  set: (brands: BrandSchemaType[]) => void;
}

export const BrandContext = createContext<BrandContextValue | undefined>(
  undefined
);

export function useBrandContext() {
  const context = useContext(BrandContext);

  if (context === undefined) throw Error('We need to be inside the provider');

  return context;
}

export function BrandProvider({ children }: PropsWithChildren<any>) {
  const [brands, setBrands] = useState<BrandSchemaType[]>([]);

  const set = (value: BrandSchemaType[]) => {
    setBrands(value);
  };

  const values = useMemo(
    () => ({
      brands,
      set,
    }),
    [brands]
  );

  return (
    <BrandContext.Provider value={values}>{children}</BrandContext.Provider>
  );
}
