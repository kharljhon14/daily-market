import Brand from '@/models/brand.modal';
import connectDB from '@/utils/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function brandsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        await connectDB();

        const brands = await Brand.find();

        if (!brands)
          return res
            .status(400)
            .json({ message: 'Something went wrong fetching brands!' });

        return res
          .status(200)
          .json({ data: brands, messge: 'Successfuly getting brands' });
      } catch (err) {
        if (err instanceof Error)
          return res.status(500).json({ message: err.message });
      }
      break;

    case 'POST':
      try {
        await connectDB();

        const { name, description } = req.body;

        if (!name) return res.status(400).json({ message: 'Name is required' });

        const foundBrand = await Brand.findOne({ name });
        if (foundBrand)
          return res.status(400).json({ message: 'Brand already exists' });

        const newBrand = new Brand({ name, description });

        await newBrand.save();

        return res
          .status(200)
          .json({ data: newBrand, message: 'Successfuly created brand' });
      } catch (err) {
        if (err instanceof Error)
          return res.status(500).json({ message: err.message });
      }
      break;

    default:
      break;
  }
  return res.status(404).json({ message: 'Not found' });
}
