import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

console.log('Cloudinary config:', cloudinary.config());


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/get', async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $group: { _id: "$name", doc: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$doc" } }
    ]);

    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/upload', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const stream = cloudinary.v2.uploader.upload_stream(
    { resource_type: 'image' },
    async (error, result) => {
      if (error) {
        console.error('Cloudinary error:', error);
        return res.status(500).json({ error: 'Image upload failed' });
      }

      const product = new Product({
        name,
        description,
        price,
        imageUrl: result.secure_url,
      });

      await product.save();
      res.json(product);
    }
  );

  stream.end(req.file.buffer);
});


// router.put('/:id', async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

router.put('/:id', async (req, res) => {
  try {
    const { price } = req.body;

    if (price === undefined) {
      return res.status(400).json({ error: "Price is required" });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updated);

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});


router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});


export default router;
