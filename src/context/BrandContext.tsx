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
  selectedBrand: BrandResponseType | undefined;
  set: (brands: BrandResponseType[]) => void;
  setSelectedBrandToEdit: (brand: BrandResponseType | undefined) => void;
  addBrand: (brand: BrandResponseType) => void;
  updateBrand: (brand: BrandResponseType) => void;
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
  const [selectedBrand, setSelectedBrand] = useState<BrandResponseType>();

  const set = (value: BrandResponseType[]) => {
    setBrands(value);
  };

  const setSelectedBrandToEdit = (
    selectedBrandToUpdate?: BrandResponseType
  ) => {
    setSelectedBrand(selectedBrandToUpdate);
  };

  const addBrand = (newBrand: BrandResponseType) => {
    setBrands([...brands, newBrand]);
  };

  const updateBrand = (brandToUpdate: BrandResponseType) => {
    setBrands((prev) =>
      prev.map((brand) => {
        if (brand._id === brandToUpdate._id) return brandToUpdate;
        return brand;
      })
    );
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
      selectedBrand,
      set,
      setSelectedBrandToEdit,
      addBrand,
      updateBrand,
      deleteBrand,
    }),
    [brands, selectedBrand]
  );

  return (
    <BrandContext.Provider value={values}>{children}</BrandContext.Provider>
  );
}
