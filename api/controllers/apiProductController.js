import { unlink } from 'node:fs/promises';
import path from 'node:path';
import createError from 'http-errors';
import Product from '../../models/Product.js';

export const listProducts = async (req, res, next) => {
  try {
    const userId = req.apiUserId;

    // http://localhost:3000/api/products?name=Nintendo
    const filterName = req.query.name;
    // http://localhost:3000/api/products?price=100-200
    const filterPrice = req.query.price;

    // http://localhost:3000/api/products?limit=2&skip=2
    const limit = req.query.limit;
    const skip = req.query.skip;

    // http:localhost:3000/api/products?sort=-name&fields=name
    // http:localhost:3000/api/products?sort=-name&fields=name%20-_id%20price
    const sort = req.query.sort;
    const fields = req.query.fields;

    // http://localhost:3000/api/products?limit=2&skip=2&count=true
    const withCount = req.query.count === 'true';

    const filter = {
      owner: userId,
    };

    if (filterName) {
      filter.name = new RegExp(filterName, 'i');
    }
    if (typeof filterPrice === 'string' && filterPrice.trim()) {
      if (filterPrice.includes('-')) {
        const [min, max] = filterPrice.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max)) {
          filter.price = { $gte: min, $lte: max };
        }
      } else {
        const priceNumber = Number(filterPrice);
        if (!isNaN(priceNumber)) {
          filter.price = priceNumber;
        }
      }
    }

    const products = await Product.list(filter, limit, skip, sort, fields);
    const results = { results: products };

    if (withCount) {
      const count = await Product.countDocuments(filter);
      results.count = count;
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.apiUserId;

    const product = await Product.findOne({ _id: productId, owner: userId });

    res.json({ results: product });
  } catch (error) {
    next(error);
  }
};

export const addNewProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const userId = req.apiUserId;

    const product = new Product(productData);
    product.image = req.file?.filename;
    product.owner = userId;

    const savedProduct = await product.save();

    res.status(201).json({ result: savedProduct });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.apiUserId;
    const productData = req.body;
    productData.image = req.file?.filename;

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
        owner: userId,
      },
      productData,
      { new: true },
    );

    res.json({ result: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.apiUserId;

    const product = await Product.findById(productId);

    if (!product) {
      console.warning(
        `WARNING: user ${userId} is trying to delete non existing products.`,
      );
      return next(createError(404));
    }

    if (product.owner.toString() !== userId) {
      console.warning(
        `WARNING: user ${userId} is trying to delete products from other users.`,
      );
      return next(createError(401));
    }

    if (product.image) {
      await unlink(
        path.join(
          import.meta.dirname,
          '..',
          'uploads',
          'products',
          product.image,
        ),
      );
    }
    await Product.deleteOne({ _id: productId });

    res.json();
  } catch (error) {
    next(error);
  }
};
