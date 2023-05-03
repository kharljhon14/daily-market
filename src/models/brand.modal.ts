import { Schema, model, models } from 'mongoose';

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Brand = models.Brand || model('Brand', BrandSchema);

export default Brand;
