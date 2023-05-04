import { BrandResponseType } from '@/types/brand';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface BrandContextValue {
  brands: BrandResponseType[];
  set: (brands: BrandResponseType[]) => void;
  addBrand: (brand: BrandResponseType) => void;
  deleteBrand: (id: string) => void;
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
  const [brands, setBrands] = useState<BrandResponseType[]>([]);

  const set = (value: BrandResponseType[]) => {
    setBrands(value);
  };

  const addBrand = (newBrand: BrandResponseType) => {
    setBrands([...brands, newBrand]);
  };

  const deleteBrand = (id: string) => {
    if (brands.length <= 0) return;

    // const items = [...brands];
    // const itemIndex = items.findIndex((i) => i._id === id);
    // items.splice(itemIndex, 1);

    // if (itemIndex >= 0) {
    //   setBrands(items);
    // }

    setBrands((prev) => prev.filter((brand) => brand._id !== id));
  };

  const values = useMemo(
    () => ({
      brands,
      set,
      addBrand,
      deleteBrand,
    }),
    [brands]
  );

  return (
    <BrandContext.Provider value={values}>{children}</BrandContext.Provider>
  );
}
