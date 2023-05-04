import Brand from '@/models/brand.modal';
import connectDB from '@/utils/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function brandHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PUT':
      try {
        await connectDB();

        const { name, description } = req.body;

        const brand = await Brand.findByIdAndUpdate(
          id,
          { name, description },
          { new: true }
        );

        if (!brand) return res.status(400).json({ message: 'Invalid id' });

        return res
          .status(200)
          .json({ data: brand, message: 'Successfuly updated brand' });
      } catch (err) {
        if (err instanceof Error)
          return res.status(500).json({ message: err.message });
      }

      break;

    case 'DELETE':
      try {
        await connectDB();

        const brand = await Brand.findByIdAndDelete(id);

        if (!brand) return res.status(400).json({ message: 'Invalid id' });

        return res
          .status(200)
          .json({ data: brand, message: 'Successfuly deleted brand' });
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
